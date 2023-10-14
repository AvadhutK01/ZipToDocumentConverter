const { promisify } = require('util');
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');
const os = require('os');
const pdfMakePrinter = require('pdfmake');
const PdfData = require('../Models/PdfModel');
const AWS = require('aws-sdk');

module.exports.ExtractZip = async (req, res) => {
    const id = req.body.id;
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname.split('.')[0];

    try {
        const zip = new AdmZip(fileBuffer);
        const zipEntries = zip.getEntries();
        const userHomeDir = os.homedir();
        const extractionPath = path.join(userHomeDir, 'extractedFiles');
        const extractedFiles = [];
        await promisify(fs.mkdir)(extractionPath, { recursive: true });
        for (const zipEntry of zipEntries) {
            if (!zipEntry.isDirectory) {
                const content = zipEntry.getData();
                const outputFilePath = path.join(extractionPath, zipEntry.entryName);
                await promisify(fs.mkdir)(path.dirname(outputFilePath), { recursive: true });
                await promisify(fs.writeFile)(outputFilePath, content);
            }
        }
        const tableBody = zipEntries
            .filter((zipEntry) => !zipEntry.isDirectory)
            .map((zipEntry, index) => {
                const fileName = path.basename(zipEntry.entryName);
                const filePath = path.join(extractionPath, zipEntry.entryName);
                extractedFiles.push({ name: fileName, path: filePath });
                return [(index + 1).toString(), fileName, filePath];
            });

        const table = {
            headerRows: 1,
            widths: [30, 150, '*'],
            body: [
                [{ text: 'Sr no', style: 'tableHeader', alignment: 'center' }, 'File name', 'File Path'],
                ...tableBody
            ]
        };
        const fonts = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
            }
        };

        const printer = new pdfMakePrinter(fonts);
        const docDefinition = {
            content: [
                { text: 'Extracted Files', style: 'header' },
                { table: table, style: 'table' }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                table: {
                    margin: [0, 5, 0, 15]
                }
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const pdfChunks = [];
        pdfDoc.on('data', chunk => pdfChunks.push(chunk));
        pdfDoc.on('end', async () => {
            const pdfBuffer = Buffer.concat(pdfChunks);
            try {
                const s3 = new AWS.S3({
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY
                });
                const params = {
                    Bucket: 'zippdfbucket',
                    Key: `${fileName}_files_list.pdf`,
                    Body: pdfBuffer,
                    ACL: 'public-read',
                    ContentType: 'application/pdf'
                };
                const s3Response = await s3.upload(params).promise();

                await PdfData.create({
                    PdfName: `${fileName}_files_list.pdf`,
                    PdfLink: s3Response.Location,
                    userId: id
                });

                res.status(200).json({ message: 'Files extracted, saved, and uploaded successfully', fileUrl: s3Response.Location });
            } catch (error) {
                console.error('Error uploading PDF to S3:', error);
                res.status(500).json({ error: 'Error uploading PDF to S3' });
            }
        });

        pdfDoc.end();
    } catch (error) {
        console.error('Error extracting and saving files:', error);
        res.status(500).json({ error: 'Error extracting and saving files' });
    }
};

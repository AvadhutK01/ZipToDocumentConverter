const { promisify } = require('util');
require('dotenv').config();
const { ObjectId } = require("mongodb");
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');
const os = require('os');
const pdfMakePrinter = require('pdfmake');
const PdfData = require('../Models/PdfModel');
const AWS = require('aws-sdk');

module.exports.ExtractZip = async (req, res) => {
    const id = req.user.id;
    const userId = new ObjectId(id);
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname.split('.')[0];

    try {
        // Extracting and storing unzipped files to the users machine with AdmZip
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
        //Creating Pdf layout for storing locations of unzipped files
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
            widths: [30, 150, 370],
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
                    margin: [0, 0, 0, 0]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                table: {
                    margin: [-30, 0, 0, 0]
                }
            }
        };

        // Generate PDF and save it to the output folder
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const pdfChunks = [];
        pdfDoc.on('data', chunk => pdfChunks.push(chunk));
        pdfDoc.on('end', async () => {
            const pdfBuffer = Buffer.concat(pdfChunks);
            try {
                //uploding pdf to the s3 bucket
                const s3 = new AWS.S3({
                    accessKeyId: process.env.IAM_USER_KEY,
                    secretAccessKey: process.env.IAM_USER_SECRET
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
                    userId: userId
                });
                //Sending filerUrl to frontend
                res.status(200).json({ message: 'Files extracted, saved, and uploaded successfully', fileUrl: s3Response.Location, name: s3Response.Key });
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

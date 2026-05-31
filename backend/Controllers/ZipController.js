require('dotenv').config();
const { ObjectId } = require('mongodb');
const AdmZip = require('adm-zip');
const path = require('path');
const pdfMakePrinter = require('pdfmake');
const PdfData = require('../Models/PdfModel');
const AWS = require('aws-sdk');

module.exports.ExtractZip = async (req, res) => {
    const id = req.user.id;
    const userId = new ObjectId(id);
    const fileBuffer = req.file.buffer;
    const zipFileName = req.file.originalname.split('.')[0];

    try {
        const zip = new AdmZip(fileBuffer);
        const zipEntries = zip.getEntries();

        const tableBody = zipEntries
            .filter(zipEntry => !zipEntry.isDirectory)
            .map((zipEntry, index) => [
                (index + 1).toString(),
                path.basename(zipEntry.entryName),
                zipEntry.entryName
            ]);

        const table = {
            headerRows: 1,
            widths: [30, 150, 370],
            body: [
                [
                    { text: 'Sr no', style: 'tableHeader', alignment: 'center' },
                    'File name',
                    'File Path'
                ],
                ...tableBody
            ]
        };

       const fonts = {
    Roboto: {
        normal: path.resolve(__dirname, '../Roboto-Regular.ttf'),
        bold: path.resolve(__dirname, '../Roboto-Medium.ttf'),
        italics: path.resolve(__dirname, '../Roboto-Italic.ttf'),
        bolditalics: path.resolve(__dirname, '../Roboto-MediumItalic.ttf')
    }
};

        const printer = new pdfMakePrinter(fonts);

        const docDefinition = {
            content: [
                { text: 'Extracted Files', style: 'header' },
                { table, style: 'table' }
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

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const pdfChunks = [];

        pdfDoc.on('data', chunk => pdfChunks.push(chunk));

        pdfDoc.on('end', async () => {
            const pdfBuffer = Buffer.concat(pdfChunks);

            try {
                const s3 = new AWS.S3({
                    accessKeyId: process.env.IAM_USER_KEY,
                    secretAccessKey: process.env.IAM_USER_SECRET
                });

                const params = {
    Bucket: 'zippdfbucketz2d',
    Key: `${zipFileName}_files_list.pdf`,
    Body: pdfBuffer,
    ContentType: 'application/pdf'
};

                const s3Response = await s3.upload(params).promise();

                await PdfData.create({
                    PdfName: `${zipFileName}_files_list.pdf`,
                    PdfLink: s3Response.Location,
                    userId
                });

                return res.status(200).json({
                    message: 'PDF generated and uploaded successfully',
                    fileUrl: s3Response.Location,
                    name: s3Response.Key
                });
            } catch (error) {
                console.error('Error uploading PDF to S3:', error);

                return res.status(500).json({
                    error: 'Error uploading PDF to S3'
                });
            }
        });

        pdfDoc.on('error', error => {
            console.error('Error generating PDF:', error);

            return res.status(500).json({
                error: 'Error generating PDF'
            });
        });

        pdfDoc.end();
    } catch (error) {
        console.error('Error processing ZIP file:', error);

        return res.status(500).json({
            error: 'Error processing ZIP file'
        });
    }
};

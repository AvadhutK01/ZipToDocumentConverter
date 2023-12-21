const pdfData = require("../Models/PdfModel");
const { ObjectId } = require("mongodb");
// Getting urls of pdfs from database
module.exports.viewPdfLinks = async (req, res) => {
    try {
        const userId = new ObjectId(req.user?.id);
        if (!userId) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const result = await pdfData.find({ userId: userId });

        res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};
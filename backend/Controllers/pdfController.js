const PdfData = require("../Models/PdfModel")
module.exports.ViewPdfLinks = (req, res) => {
    const id = req.body.id;
    const result = PdfData.find({ $where: { userId: id } });
}
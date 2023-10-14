const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pdfSchema = new mongoose.Schema({
    PdfName: {
        type: Schema.Types.String,
        required: true
    },
    PdfLink: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const PdfData = mongoose.model("PdfData", pdfSchema);

module.exports = PdfData;
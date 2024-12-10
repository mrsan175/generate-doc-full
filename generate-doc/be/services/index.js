const generateDocument = require('../utils/generate-document');
const generateFieldData = require('./fields');

const serviceDocument = async ({ type, data, otp }) => {
  try {
    const documentData = await generateFieldData(type, data);
    if (!documentData || Object.keys(documentData).length === 0) {
      throw new Error(`Field untuk dokumen dengan tipe "${type}" tidak ditemukan.`);
    }
    const { filePath, no_surat, qrCode } = await generateDocument(type, documentData);
    return {
      filePath,
      no_surat,
      qrCode,
    };
  } catch (error) {
    throw new Error(
      `Terjadi kesalahan dalam proses pembuatan dokumen ${type.toUpperCase()}: ${error.message}`
    );
  }
};

module.exports = {
  serviceDocument,
};

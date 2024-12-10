const prisma = require('../prisma');
const { setDate } = require('../utils/generate-date');
const generateFieldData = async (type, data) => {
  try {
    const document = await prisma.documents.findUnique({
      where: { type },
      include: { document_fields: true },
    });

    if (!document) {
      throw new Error(`Dokumen dengan tipe "${type}" tidak ditemukan.`);
    }

    const fields = document.document_fields;

    const documentData = fields.reduce((acc, field) => {
      const value = data[field.field_name];

      if (field.field_name === 'tableData' && Array.isArray(value)) {
        acc[field.field_name] = value.map((item, index) => ({
          no: index + 1,
          ...item,
        }));
      } else if (field.field_name === 'tanggal_hijriyah' || field.field_name === 'tanggal_masehi') {
        const { tanggalHijriah, tanggalMasehi } = setDate(data.tanggal_hijriyah, data.tanggal_masehi);
        acc['tanggal_hijriyah'] = tanggalHijriah;
        acc['tanggal_masehi'] = tanggalMasehi;
      } else {
        acc[field.field_name] = value || null;
      }
      return acc;
    }, {});

    return documentData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = generateFieldData;

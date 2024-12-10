const { setDate } = require('./generate-date'); // Pastikan jalur `generate-date` benar

const generateFields = (type, body) => {
  switch (type) {
    case 'kkp': {
      const { kepada, tempat_tujuan, nama_prodi, nama_ttd, tanggal_hijriah, tanggal_masehi, tableData } = body;
      const finalTanggalHijriah = tanggal_hijriah ? setDate(tanggal_hijriah) : setDate(new Date().toISOString());
      const finalTanggalMasehi = tanggal_masehi ? setDate(tanggal_masehi) : new Date().toISOString();
      const tableDataWithNo = tableData.map((data, index) => ({ no: index + 1, ...data }));
      return {
        kepada,
        tempat_tujuan,
        nama_prodi,
        nama_ttd,
        tanggal_hijriyah: finalTanggalHijriah,
        tanggal_masehi: finalTanggalMasehi,
        tableData: tableDataWithNo,
      };
    }
    default:
      throw new Error(`Type "${type}" is not supported.`);
  }
};

module.exports = {
  generateFields,
};

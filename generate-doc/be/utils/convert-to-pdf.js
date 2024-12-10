const { exec } = require('child_process');
const path = require('path');

/**
 * Konversi file Word (.docx) ke PDF menggunakan LibreOffice.
 * @param {string} inputPath - Path file input .docx
 * @param {string} outputDir - Direktori untuk menyimpan file output .pdf
 * @returns {Promise<string>} Path ke file PDF yang dihasilkan
 */
const convertDocxToPdf = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    // Perintah untuk menjalankan LibreOffice dalam mode headless
    const command = `libreoffice --headless --convert-to pdf --outdir ${outputDir} ${inputPath}`;

    // Eksekusi perintah
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during conversion: ${stderr}`);
        reject(new Error(`Gagal mengonversi file ${inputPath} ke PDF.`));
      } else {
        // Path file PDF output
        const outputFileName = path.basename(inputPath, '.docx') + '.pdf';
        const outputPath = path.join(outputDir, outputFileName);
        console.log(`File converted to PDF: ${outputPath}`);
        resolve(outputPath);
      }
    });
  });
};

module.exports = convertDocxToPdf;

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
// const { lastNumber } = require('../api');
const { generateQRCodeWithImage } = require('./generate-qrcode');
const ImageModule = require('docxtemplater-image-module-free');
const { generateShortStringData } = require('./split-data-utils');

const generateDocument = async (type, data) => {
  try {
    // const no_surat = await lastNumber(type);
    const no_surat = '01/05/C-4-II/XI/46/2024';
    const templatePath = path.resolve(__dirname, `../templates/${type}.docx`);
    const templateContent = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(templateContent);
    const stringData = generateShortStringData(data);

    // console.log(stringData.length);

    const qrCodePath = await generateQRCodeWithImage(
      `${stringData || 'unknown'}`,
    );

    const imageModuleOpts = {
      centered: true,
      fileType: 'docx',
      getImage: (tagValue) => {
        if (tagValue === 'qrCode') {
          return fs.readFileSync(qrCodePath);
        }
        throw new Error(`Tag ${tagValue} tidak dikenal`);
      },
      getSize: () => {
        return [110, 110];
      },
    };

    const imageModule = new ImageModule(imageModuleOpts);

    const doc = new Docxtemplater(zip, {
      modules: [imageModule],
    });

    doc.render({
      ...data,
      no_surat,
      qrCode: 'qrCode',
    });

    const outputDir = path.resolve(__dirname, '../templates/output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const time = new Date().getTime();
    const outputPath = path.join(outputDir, `${time}.docx`);
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputPath, buffer);

    return { filePath: outputPath, no_surat: no_surat, qrCode: qrCodePath };
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Gagal membuat dokumen');
  }
};

module.exports = generateDocument;

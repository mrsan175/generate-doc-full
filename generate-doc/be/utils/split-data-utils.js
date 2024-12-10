const {encrypt} = require('./encrypy-utils');
const pako = require('pako');

const generateShortStringData = (data) => {
    const mainFields = [
        data.kepada,
        data.tempat_tujuan,
        data.nama_prodi,
        data.nama_ttd,
        data.tanggal_hijriyah,
        data.tanggal_masehi,
    ].join('#');
    const tableData = data.tableData
        .map((item) => `${item.no}:${item.nama_mahasiswa}:${item.nim}`)
        .join('|'); 
        const dataFields = `${mainFields}#${tableData}`;
        const encryptetDataWithoutPako = encrypt(dataFields);
        console.log('-------------------------------------------------');
        console.log('Fields yang belum terkompres:', dataFields.length, 'karakter');
        console.log('Data enkripsi yang belum terkompres:', encryptetDataWithoutPako.length, 'karakter');
        const compressedFields = pako.deflate(dataFields, { level: 9 });
        const encryptedData = encrypt(compressedFields);
        console.log('-------------------------------------------------');
        console.log('Fields yang sudah terkompres:', compressedFields.length, 'karakter');
        console.log('Data enkripsi yang sudah terkompres:', encryptedData.length, 'karakter');
        console.log('-------------------------------------------------');
    return encryptedData;
    };

module.exports = { generateShortStringData };
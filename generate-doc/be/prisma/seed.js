const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const documentKKP = await prisma.documents.create({
    data: {
      type: 'kkp',
      document_fields: {
        create: [
          {
            field_name: 'kepada',
            filed: 'Kepada', // Nama yang muncul di FE
          },
          {
            field_name: 'tempat_tujuan',
            filed: 'Tempat Tujuan', // Nama yang muncul di FE
          },
          {
            field_name: 'nama_prodi',
            filed: 'Nama Program Studi', // Nama yang muncul di FE
          },
          {
            field_name: 'nama_ttd',
            filed: 'Nama Tanda Tangan', // Nama yang muncul di FE
          },
          {
            field_name: 'tanggal_hijriyah',
            filed: 'Tanggal Hijriyah', // Nama yang muncul di FE
          },
          {
            field_name: 'tanggal_masehi',
            filed: 'Tanggal Masehi', // Nama yang muncul di FE
          },
          {
            field_name: 'tableData',
            filed: 'Data Mahasiswa', // Nama yang muncul di FE
          },
        ],
      },
    },
  });

  console.log('Seed data added:', documentKKP);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

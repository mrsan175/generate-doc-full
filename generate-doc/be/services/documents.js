const prisma = require('../prisma');

const allDocumet = async () => {
  return await prisma.documents.findMany({
    include: {
      document_fields: true
    }
  });
};

const document = async (id) => {
  return await prisma.documents.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      document_fields: true
    }
  });

}

const editDocument = async (id, data) => {
  return await prisma.documents.update({
    where: {
      id: Number(id)
    },
    data: {
      ...data
    }
  });
}

const createDocument = async (data, include) => {
  return await prisma.documents.create({
    data: {
      ...data,
      document_fields: {
        create: include
      }
    }
  });

}

const deleteDocument = async (id) => {
  return await prisma.documents.delete({
    where: {
      id: Number(id)
    }
  });

}

module.exports = {
  allDocumet,
  document,
  editDocument,
  createDocument,
  deleteDocument
};

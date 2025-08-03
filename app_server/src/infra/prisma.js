const { PrismaClient } = require("../../generated/prisma/client.js");

let prisma = new PrismaClient();

module.exports = prisma;

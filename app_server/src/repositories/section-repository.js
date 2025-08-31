const Section = require("../models/section.js");
const {
  getAllSections: doGetAllSections,
  getActiveSections: doGetActiveSections,
} = require("../services/prisma/section-service.js");

async function getAllSections() {
  const sections = await doGetAllSections();
  return sections.map((section) => Section.fromApiObject(section));
}

async function getActiveSections() {
  const sections = await doGetActiveSections();
  return sections.map((section) => Section.fromApiObject(section));
}

module.exports = { getActiveSections, getAllSections };

const {
  getAllSections: doGetAllSections,
  getActiveSections: doGetActiveSections,
} = require("../../repositories/section-repository.js");
const { toSectionResource } = require("../../resources/v3/section-resource.js");

async function getSections(req, res) {
  const sections = req.query.ativo
    ? await doGetActiveSections()
    : await doGetAllSections();
  res.json({ data: sections.map((section) => toSectionResource(section)) });
}

module.exports = { getSections };

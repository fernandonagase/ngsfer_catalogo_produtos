function parseQueryArray(param, { delimiter = "," } = {}) {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  return param.split(delimiter).map((item) => item.trim());
}

module.exports = { parseQueryArray }
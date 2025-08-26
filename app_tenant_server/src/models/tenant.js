const Company = require("./company");

class Tenant {
  id;
  subdomain;
  api;
  nomeLoja;
  descricaoLoja;
  urlLogoLoja;
  whatsappPedidos;
  empresa;

  constructor({
    id,
    subdomain,
    api,
    nomeLoja,
    descricaoLoja,
    urlLogoLoja,
    whatsappPedidos,
    empresa,
  }) {
    this.id = id;
    this.subdomain = subdomain;
    this.api = api;
    this.nomeLoja = nomeLoja;
    this.descricaoLoja = descricaoLoja;
    this.urlLogoLoja = urlLogoLoja;
    this.whatsappPedidos = whatsappPedidos;
    this.empresa = empresa ? Company.fromDbResource(empresa) : null;
  }
}

module.exports = Tenant;

const Company = require("./company");

class Tenant {
  id;
  subdomain;
  api;
  nomeLoja;
  descricaoLoja;
  urlLogoLoja;
  whatsappPedidos;
  corPrincipal;
  empresa;

  constructor({
    id,
    subdomain,
    api,
    nomeLoja,
    descricaoLoja,
    urlLogoLoja,
    whatsappPedidos,
    corPrincipal,
    empresa,
  }) {
    this.id = id;
    this.subdomain = subdomain;
    this.api = api;
    this.nomeLoja = nomeLoja;
    this.descricaoLoja = descricaoLoja;
    this.urlLogoLoja = urlLogoLoja;
    this.whatsappPedidos = whatsappPedidos;
    this.corPrincipal = corPrincipal;
    this.empresa = empresa ? Company.fromDbResource(empresa) : null;
  }
}

module.exports = Tenant;

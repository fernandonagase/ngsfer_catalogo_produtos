class Tenant {
  id;
  subdomain;
  api;
  nomeLoja;
  descricaoLoja;
  urlLogoLoja;
  whatsappPedidos;

  constructor({ id, subdomain, api, nomeLoja, descricaoLoja, urlLogoLoja, whatsappPedidos }) {
    this.id = id;
    this.subdomain = subdomain;
    this.api = api;
    this.nomeLoja = nomeLoja;
    this.descricaoLoja = descricaoLoja;
    this.urlLogoLoja = urlLogoLoja;
    this.whatsappPedidos = whatsappPedidos;
  }
}

module.exports = Tenant;

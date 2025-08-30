const CompanyDto = require("./company-dto");

class TenantDto {
  subdomain;
  api;
  nomeLoja;
  descricaoLoja;
  urlLogoLoja = "https://picsum.dev/300/300";
  whatsappPedidos;
  empresa;
  corPrincipal;

  constructor(tenant) {
    this.subdomain = tenant.subdomain;
    this.api = tenant.api;
    this.nomeLoja = tenant.nomeLoja;
    this.descricaoLoja = tenant.descricaoLoja || undefined;
    this.urlLogoLoja = tenant.urlLogoLoja || this.urlLogoLoja;
    this.whatsappPedidos = tenant.whatsappPedidos || undefined;
    this.empresa = tenant.empresa ? new CompanyDto(tenant.empresa) : undefined;
    this.corPrincipal = tenant.corPrincipal;
  }
}

module.exports = TenantDto;

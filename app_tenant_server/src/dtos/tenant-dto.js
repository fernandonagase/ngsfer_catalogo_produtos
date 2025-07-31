class TenantDto {
    subdomain;
    api;
    nomeLoja;
    descricaoLoja;
    urlLogoLoja = 'https://picsum.dev/300/300';

    constructor(tenant) {
        this.subdomain = tenant.subdomain;
        this.api = tenant.api;
        this.nomeLoja = tenant.nomeLoja;
        this.descricaoLoja = tenant.descricaoLoja;
        this.urlLogoLoja = tenant.urlLogoLoja || this.urlLogoLoja;
    }
}

module.exports = TenantDto;
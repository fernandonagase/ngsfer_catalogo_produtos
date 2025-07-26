class TenantDto {
    subdomain;
    api;

    constructor(tenant) {
        this.subdomain = tenant.subdomain;
        this.api = tenant.api;
    }
}

module.exports = TenantDto;
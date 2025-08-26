class Company {
  id;
  document;
  name;
  tradeName;
  address;
  contactWhatsapp;
  contactPhone;
  contactEmail;

  constructor({
    id,
    document,
    name,
    tradeName,
    address,
    contactWhatsapp,
    contactPhone,
    contactEmail,
  }) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.tradeName = tradeName;
    this.address = address;
    this.contactWhatsapp = contactWhatsapp;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
  }

  static fromDbResource(dbResource) {
    return new Company({
      id: dbResource.id,
      document: dbResource.documento,
      name: dbResource.nome,
      tradeName: dbResource.nomeFantasia,
      address: dbResource.endereco,
      contactWhatsapp: dbResource.whatsappContato,
      contactPhone: dbResource.telefoneContato,
      contactEmail: dbResource.emailContato,
    });
  }
}

module.exports = Company;

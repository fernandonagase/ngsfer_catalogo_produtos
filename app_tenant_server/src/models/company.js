class Company {
  id;
  document;
  name;
  tradeName;
  address;
  contactWhatsapp;
  contactPhone;
  contactEmail;
  instagram;
  facebook;
  youtube;
  tiktok;
  twitter;
  linkedin;

  constructor({
    id,
    document,
    name,
    tradeName,
    address,
    contactWhatsapp,
    contactPhone,
    contactEmail,
    instagram,
    facebook,
    youtube,
    tiktok,
    twitter,
    linkedin,
  }) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.tradeName = tradeName;
    this.address = address;
    this.contactWhatsapp = contactWhatsapp;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
    this.instagram = instagram;
    this.facebook = facebook;
    this.youtube = youtube;
    this.tiktok = tiktok;
    this.twitter = twitter;
    this.linkedin = linkedin;
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
      instagram: dbResource.instagram,
      facebook: dbResource.facebook,
      youtube: dbResource.youtube,
      tiktok: dbResource.tiktok,
      twitter: dbResource.twitter,
      linkedin: dbResource.linkedin,
    });
  }
}

module.exports = Company;

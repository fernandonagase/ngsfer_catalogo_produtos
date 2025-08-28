class CompanyDto {
  id;
  documento;
  nome;
  nomeFantasia;
  endereco;
  whatsappContato;
  telefoneContato;
  emailContato;
  instagram;
  facebook;
  youtube;
  tiktok;
  twitter;
  linkedin;

  constructor(company) {
    this.id = company.id;
    this.documento = company.document;
    this.nome = company.name;
    this.nomeFantasia = company.tradeName;
    this.endereco = company.address;
    this.whatsappContato = company.contactWhatsapp;
    this.telefoneContato = company.contactPhone;
    this.emailContato = company.contactEmail;
    this.instagram = company.instagram;
    this.facebook = company.facebook;
    this.youtube = company.youtube;
    this.tiktok = company.tiktok;
    this.twitter = company.twitter;
    this.linkedin = company.linkedin;
  }
}

module.exports = CompanyDto;

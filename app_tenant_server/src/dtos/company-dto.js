class CompanyDto {
  id;
  documento;
  nome;
  nomeFantasia;
  endereco;
  whatsappContato;
  telefoneContato;
  emailContato;

  constructor(company) {
    this.id = company.id;
    this.documento = company.document;
    this.nome = company.name;
    this.nomeFantasia = company.tradeName;
    this.endereco = company.address;
    this.whatsappContato = company.contactWhatsapp;
    this.telefoneContato = company.contactPhone;
    this.emailContato = company.contactEmail;
  }
}

module.exports = CompanyDto;

const Product = require("./product");

class ProductImage {
  id;
  url;
  altText;
  position;

  constructor(id, url, altText, position) {
    this.id = id;
    this.url = url;
    this.altText = altText;
    this.position = position;
  }

  static fromApiObject(apiObject) {
    return new ProductImage(
      apiObject.id,
      apiObject.url,
      apiObject.altText,
      apiObject.position
    );
  }
}

module.exports = ProductImage;

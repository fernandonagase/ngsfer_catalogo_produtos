function toProductImageResource(productImage) {
  const resource = {
    id: productImage.id,
    url: productImage.url,
    altText: productImage.altText,
    position: productImage.position,
  };
  return resource;
}

module.exports = { toProductImageResource };

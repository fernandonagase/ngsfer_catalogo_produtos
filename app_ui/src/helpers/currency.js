function formatCurrencyFromCents(value) {
  if (typeof value !== 'number') {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
}

export { formatCurrencyFromCents }

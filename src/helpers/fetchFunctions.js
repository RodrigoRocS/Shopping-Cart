export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (item) => {
  if (!item) throw new Error('Termo de busca não informado');
  const productList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await productList.json();
  return data.results;
};

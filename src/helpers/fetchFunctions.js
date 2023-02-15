export const fetchProduct = async (ProductID) => {
  if (!ProductID) throw new Error('ID não informado');
  const productDetail = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
  const data = await productDetail.json();
  return data;
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) throw new Error('Termo de busca não informado');
  try {
    const productList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
    const data = await productList.json();
    return data.results;
  } catch (error) {
    return error;
  }
};

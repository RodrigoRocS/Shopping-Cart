export const fetchProduct = async (ProductID) => {
  if (!ProductID) throw new Error('ID não informado');
  try {
    const productDetail = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
    const data = await productDetail.json();
    return data;
  } catch (error) {
    throw new Error('ID não informado');
  }
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) throw new Error('Termo de busca não informado');
  try {
    const productList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
    const data = await productList.json();
    return data.results;
  } catch (error) {
    throw new Error('Termo de busca não informado');
  }
};

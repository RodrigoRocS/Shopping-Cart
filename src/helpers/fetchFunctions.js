export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (item) => {
  const productList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const productData = await productList.json();
  return productData;
};

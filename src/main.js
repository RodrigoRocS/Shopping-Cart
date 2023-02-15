import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement, createCartProductElement }
  from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const secProduct = document.querySelector('.products');

const addCart = () => {
  const addBtn = document.querySelectorAll('.product__add');
  addBtn.forEach((e) => {
    e.addEventListener('click', async (evt) => {
      const takeProd = evt.target.closest('.product');
      const takeProdId = takeProd.children[0].innerText;
      saveCartID(takeProdId);
      const cart = createCartProductElement(await fetchProduct(takeProdId));
      const takeOl = document.querySelector('ol');
      takeOl.appendChild(cart);
    });
  });
};

// adiciona produtos no catalogo
const addProd = async () => {
  const errorMsg = 'Algum erro ocorreu, recarregue a página e tente novamente';
  const productList = await fetchProductsList('computador');
  if (productList.length > 0) {
    productList.forEach((e) => secProduct
      .appendChild(createProductElement(e)));
  } else {
    secProduct.appendChild(createCustomElement('span', 'error', errorMsg));
  }
  addCart();
};
const loadCart = () => {
  const promises = getSavedCartIDs().map(async (e) => {
    const cart = await fetchProduct(e);
    return cart;
  });
  console.log(promises);
  Promise.all(promises).then((data) => data.forEach((e) => {
    const car = createProductElement(e);
    const takeOl = document.querySelector('ol');
    takeOl.appendChild(car);
  }));
};
// adiciona msg de loading
const loadingMsg = async () => {
  const loadings = createCustomElement('span', 'loading', 'carregando...');
  secProduct.appendChild(loadings);
  await addProd();
  secProduct.removeChild(loadings);
};

loadingMsg();
loadCart();

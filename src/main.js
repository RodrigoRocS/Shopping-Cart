import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productList = await fetchProductsList('computador');
const secProduct = document.querySelector('.products');
const loadings = document.getElementsByClassName('loading');
const magicNumber = 1000;
const errorMsg = 'Algum erro ocorreu, recarregue a página e tente novamente';

const addProd = () => {
  if (productList.length > 0) {
    productList.forEach((e) => secProduct
      .appendChild(createProductElement(e)));
  } else {
    secProduct.appendChild(createCustomElement('span', 'error', errorMsg));
  }
};
const loadingMsg = (time) => {
  secProduct.appendChild(createCustomElement('span', 'loading', 'carregando...'));
  setTimeout(() => {
    addProd();
    if (loadings.length) loadings[0].remove();
  }, time);
};

loadingMsg(magicNumber);

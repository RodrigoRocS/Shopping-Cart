import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productList = await fetchProductsList('computador');
const secProduct = document.querySelector('.products');
const loadings = document.getElementsByClassName('loading');
const magicNumber = 1000;

const addProd = () => productList.forEach((e) => secProduct
  .appendChild(createProductElement(e)));

const loadingMsg = (time) => {
  secProduct.appendChild(createCustomElement('span', 'loading', 'carregando...'));
  setTimeout(async () => {
    if (loadings.length) loadings[0].remove();
    await addProd();
  }, time);
};

loadingMsg(magicNumber);

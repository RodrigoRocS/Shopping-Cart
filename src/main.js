import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createProductElement, createCustomElement,
  createCartProductElement,
} from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const secProduct = document.querySelector('.products');
const totalPrice = document.querySelector('.total-price');

const subTotal = async () => {
  const promises = getSavedCartIDs().map(async (e) => {
    const cart = await fetchProduct(e);
    return cart;
  });
  const objProd = await Promise.all(promises);
  const pegaValores = objProd.map((e) => e.base_price);
  const sumTotal = pegaValores.reduce((acc, curr) => acc + curr, 0);
  totalPrice.innerHTML = sumTotal;
  localStorage.setItem('valor', JSON.stringify(totalPrice.innerHTML));
};

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
      subTotal();
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
  Promise.all(promises).then((data) => data.forEach((e) => {
    const car = createCartProductElement(e);
    const takeOl = document.querySelector('ol');
    takeOl.appendChild(car);
  }));
};
// adiciona msg de loading
const loading = async () => {
  const loadings = createCustomElement('span', 'loading', 'carregando...');
  secProduct.appendChild(loadings);
  await addProd();
  secProduct.removeChild(loadings);
  loadCart();
  // subTotal();
};

window.onload = () => {
  totalPrice.innerHTML = JSON.parse(localStorage.getItem('valor'));
  loading();
};

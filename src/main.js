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
const takeOl = document.querySelector('ol');

const subTotal = async () => {
  const pegaValores = JSON.parse(localStorage.getItem('valor'));
  const sumTotal = pegaValores.reduce((acc, curr) => acc + Number(curr), 0);
  totalPrice.innerText = sumTotal;
};

const salvaValue = () => {
  const pegalis = document.querySelectorAll('.cart__product > div > span > span');
  const a = [];
  pegalis.forEach((e) => {
    a.push(e.innerHTML);
  });
  localStorage.removeItem('valor');
  localStorage.setItem('valor', JSON.stringify(a));
};

const salvaCart = () => {
  const pegaOl = document.querySelector('.cart__products');
  localStorage.removeItem('productCart');
  localStorage.setItem('productCart', JSON.stringify(pegaOl.innerHTML));
};

const removeProd = () => {
  const pegalis = document.querySelectorAll('.cart__product');
  pegalis.forEach((e) => e.addEventListener('click', () => {
    salvaValue();
    salvaCart();
    subTotal();
  }));
};

const addCart = () => {
  const addBtn = document.querySelectorAll('.product__add');
  addBtn.forEach((e) => {
    e.addEventListener('click', async (evt) => {
      const takeProd = evt.target.closest('.product');
      const takeProdId = takeProd.children[0].innerText;
      saveCartID(takeProdId);
      const cart = createCartProductElement(await fetchProduct(takeProdId));
      takeOl.appendChild(cart);
      salvaValue();
      removeProd();
      salvaCart();
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

const loadCart = async () => {
  const promises = getSavedCartIDs().map(async (e) => {
    const cart = await fetchProduct(e);
    return cart;
  });
  Promise.all(promises).then((data) => data.forEach((e) => {
    const car = createCartProductElement(e);
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
};

window.onload = () => {
  loading();
  // subTotal();
};

import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productList = await fetchProductsList('computador');
const secProduct = document.querySelector('.products');

productList.forEach((e) => secProduct.appendChild(createProductElement(e)));

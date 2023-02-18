const totalPrice = document.querySelector('.total-price');
export const subTotal = () => {
  const pegaValores = JSON.parse(localStorage.getItem('valor'));
  if (pegaValores === null) {
    totalPrice.innerHTML = 0;
  } else {
    const sumTotal = pegaValores.reduce((acc, curr) => acc + Number(curr), 0);
    totalPrice.innerText = sumTotal;
  }
};

export const salvaValue = () => {
  const pegalis = document.querySelectorAll('.cart__product > div > span > span');
  const a = [];
  pegalis.forEach((e) => {
    a.push(e.innerHTML);
  });
  localStorage.removeItem('valor');
  localStorage.setItem('valor', JSON.stringify(a));
};

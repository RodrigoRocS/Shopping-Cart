export const getAddress = async (CEP) => {
  try {
    const cepAwe = await fetch(`https://cep.awesomeapi.com.br/json/${CEP}`);
    const cepBrApi = await fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`);
    const cep = Promise.any([cepAwe, cepBrApi])
      .then((resolve) => resolve.json()).then((data) => data);
    return cep;
  } catch (error) {
    throw new Error('CEP não encontrado');
  }
};

export const searchCep = async () => {
  const takeInput = document.querySelector('.cep-input');
  const takeCepSpan = document.querySelector('.cart__address');
  try {
    const {
      street: rua = '',
      address = '',
      neighborhood: bair = '',
      district = '',
      city,
      state } = await getAddress(takeInput.value);
    takeCepSpan.innerHTML = `${rua}${address} - ${bair}${district} - ${city} - ${state}`;
  } catch (error) {
    takeCepSpan.innerHTML = 'CEP não encontrado';
  }
};

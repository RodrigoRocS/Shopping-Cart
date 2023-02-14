import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('se passado o argumento "MLB1405519561" a fetch é chamada ', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('se a função retorna uma estrutura de dados igual ao objeto produto', async () => {
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  })
  it('se a função chamada sem argumento retorna um erro com a mensagem "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  })
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('se a função chamada sem argumento retorna um erro com a mensagem "ID não informado"', async () => {
    await expect(fetchProduct('aaasdfhgfdg')).rejects.toThrow();
  })
});

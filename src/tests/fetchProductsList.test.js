import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('se a função retorna uma estrutura de dados igual ao objeto computadorSearch', async () => {
    await expect(fetchProductsList('computador')).resolves.toEqual(computadorSearch);
  })
  it('se a função chamada sem argumento retorna um erro com a mensagem "Termo de busca não informado"', async () => {
    await expect(fetchProductsList()).rejects.toThrow(new Error('Termo de busca não informado'));
  })
  it('se a função chamada sem argumento retorna um erro com a mensagem "Termo de busca não informado"', async () => {
    await expect(fetchProductsList('aadfsdf')).rejects.toThrow();
  })
});

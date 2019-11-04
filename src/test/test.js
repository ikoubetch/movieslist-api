/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const axios = require('axios');

let response;
describe('Realizando teste de consulta :', () => {
  it('Teste: Deve retornar StatusCode 200.', async () => {
    response = await axios
      .get('http://localhost:3333/producer/rank')
      .then(resp => {
        return resp;
      })
      .catch(resp => {
        return resp;
      });
    assert.equal(response.status, 200);
  });
  it('Teste: retorno deve contar propriedade "min"', () => {
    assert.exists(response.data.min);
  });
  it('Teste: retorno deve contar propriedade "max"', () => {
    assert.exists(response.data.max);
  });
});

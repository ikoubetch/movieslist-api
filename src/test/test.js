/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const axios = require('axios');

let response;
let min;
let max;
describe('Realizando teste de consulta :', async () => {
  it('Teste: Deve retornar StatusCode 200.', async () => {
    response = await axios
      .get('http://localhost:3333/producer/rank')
      .then(resp => {
        return resp;
      })
      .catch(resp => {
        return resp;
      });
    min = response.data.min.shift();
    max = response.data.max.shift();
    assert.equal(response.status, 200);
  });
  it('Teste: retorno deve contar propriedade "min"', () => {
    assert.exists(response.data.min);
  });
  it('Teste: "min" deve ser um array', () => {
    assert.isArray(response.data.min);
  });
  it('Teste: produtor de "min" deve ser "Joel Silver"', () => {
    assert.equal(min.producer, 'Joel Silver');
  });
  it('Teste: followingWin de "min" deve ser "1991"', () => {
    assert.equal(min.followingWin, 1991);
  });
  it('Teste: previousWin de "min" deve ser "1990"', () => {
    assert.equal(min.previousWin, 1990);
  });
  it('Teste: interval de "min" deve ser "1"', () => {
    assert.equal(min.interval, 1);
  });
  it('Teste: years de "min" deve ter o tamanho de 2', () => {
    assert.equal(min.years.length, 2);
  });

  it('Teste: retorno deve contar propriedade "max"', () => {
    assert.exists(response.data.max);
  });
  it('Teste: "max" deve ser um array', () => {
    assert.isArray(response.data.max);
  });
  it('Teste: produtor de "max" deve ser "Matthew Vaughn"', () => {
    assert.equal(max.producer, 'Matthew Vaughn');
  });
  it('Teste: followingWin de "max" deve ser "2015"', () => {
    assert.equal(max.followingWin, 2015);
  });
  it('Teste: previousWin de "max" deve ser "2002"', () => {
    assert.equal(max.previousWin, 2002);
  });
  it('Teste: interval de "max" deve ser "13"', () => {
    assert.equal(max.interval, 13);
  });
  it('Teste: years de "max" deve ter o tamanho de 2', () => {
    assert.equal(max.years.length, 2);
  });
});

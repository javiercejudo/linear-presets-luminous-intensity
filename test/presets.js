/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var rescale = require('rescale')(Decimal).rescale;
var intensity = require('linear-preset-factory')(require('../src/linear-presets-luminous-intensity'));

function convert(x, preset) {
  return Number(rescale(preset[0], preset[1], x));
}

function invert(preset) {
  return preset.slice().reverse();
}

describe('luminous intensity presets', function() {
  it('should convert correctly', function() {
    (100).should.be.exactly(convert(100, invert(intensity.candela_candela)), 'candela_candela')
      .and.exactly(convert(101.9367991845056, invert(intensity.candela_candlepower)), 'candela_candlepower')
      .and.exactly(convert(108.69565217391303, invert(intensity.candela_hefnerkerze)), 'candela_hefnerkerze');

    (0).should.be.exactly(convert(0, intensity.candela_candela), 'candela_candela')
      .and.exactly(convert(0, intensity.candela_candlepower), 'candela_candlepower')
      .and.exactly(convert(0, intensity.candela_hefnerkerze), 'candela_hefnerkerze');
  });
});

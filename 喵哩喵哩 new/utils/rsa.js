/**
 *
 * RSA.js - Author Bret Little
 *
 * A javascript implementation of the public-key cryptography algorithm 
 * described in the paper: "A Method for Obtaining Digital Signatures and
 * Public-Key RSAosystems" - Available at: 
 *
 * people.csail.mit.edu/rivest/Rsapaper.pdf
 * 
 * 
 *
 */

(function() {

  "use strict";

  var options, RSA, rsaUtils;

  options = {        
      p : 257,
      q : 281,        
      e : 0,
      d : 397 
  }

  rsaUtils = {

      /**
       * Generate numerical values from an input string. The conversion
       * simply uses the ascii code for each character in the string.
       *
       * @param s - The input string to convert
       * 
       * @return - An array of numerical values representing the string.
       */
       getNumeric: function(s) {

          var numeric = new Uint32Array(s.length);

          for(var i=0, iLength = s.length; i < iLength; i++) {
              numeric[i] = s.charCodeAt(i);
          }

          return numeric;
      },


      /**
       * Given an array of integers, generate a string by converting each
       * integer into it's ascii character and appending it to a string.
       * 
       * @param _num - An array of numbers to convert to a string.
       *
       * @return - A converted string value
       */
      getStringFromNumeric: function(_num) {

          var str = "";

          for(var i=0, iLength = _num.length; i < iLength; i++) {
              str += String.fromCharCode(_num[i]);
          };

          return str;
      },


      /**
       * A function for generating the remainder of an integer raised to an exponent 
       * and divided by a number. The main cryptography algorithm.
       * 
       * Base formuala - (i^(_exponent)) % _mod
       *
       * @param i - the base integer that will be encrypted. Also the base exponent. 
       * @param _exponent - The actual exponent used in the above formula.
       * @_mod - The value to mod the exponent expression by.
       *
        * @return - The encrypted or decrypted value.
       */
      modRSA: function(i, _exponent, _mod) {
          var te = _exponent.toString(2),
              c  = 1;

          for(var k=0; k < te.length; k++) {           

              c = Math.pow(c,2) % _mod;            
              if(te[k] === '1') {
                  c = (c * i) % _mod;
              } 
          }

          return c;        
      },


      /**
       * Encrypt a given value. Proxy to the modRSA function
       */
      encrypt: function(i) {    
          if(!options.e) {
              console.error('Cannot encrypt until the encryption exponent is calculated');
              return;
          }
          return this.modRSA(i, options.e, options.n);
      },


      /**
       * Decrypt a given value. Proxy to the modRSA function
       */
      decrypt: function(i) {
          return this.modRSA(i, options.d, options.n);
      },


      /**
       * Calculate the encryption exponent from the given initial parameters
       *
       */
      calcDecrypt: function(_p, _q, _d) {
          var x = [ (_p-1)*(_q-1), _d ],
              a = 1,
              b = 0,
              count = 1;

          while(true) {
              x[count+1] = x[count-1] % x[count];
              
              if(x[count+1] === 1) {
                  break;
              }

              count++;
          }

          while(true) {

              b = ( x[x.length-1] - ( a * x[0]) ) / x[1];

              if(Math.ceil(b) - b !== 0) {
                  a--;
              } else {
                  return b;
              }
          }
      }

  };        


  /**
   * Constructor for a new JSRSA object. Pass in an options object which may include:
   *
   * p - A large prime number
   * q - A large prime number      
   * d - A prime number bigger than either p or q
   * 
   */
  RSA = function(_options) {
      for(var opt in _options) {
          if(_options.hasOwnProperty(opt)) {
              options[opt] = _options[opt];
          }
      }

      options.n = options.q * options.p;

      options.e = rsaUtils.calcDecrypt(options.p, options.q, options.d);
  };

  RSA.prototype = {

      encrypt: function(_string) {
          var numeric         = rsaUtils.getNumeric(_string),
              encyptedNumeric = new Uint32Array(_string.length);

          for(var i=0, iLength = numeric.length; i < iLength; i++) {
              encyptedNumeric[i] = rsaUtils.encrypt(numeric[i]);
          }                    

          return rsaUtils.getStringFromNumeric(encyptedNumeric);
      },


      decrypt: function(_string) {
          var numeric          = rsaUtils.getNumeric(_string),
              decryptedNumeric = new Uint32Array(_string.length);

          for(var i=0, iLength=numeric.length; i < iLength; i++) {
              decryptedNumeric[i] = rsaUtils.decrypt(numeric[i]);
          }                    

          return rsaUtils.getStringFromNumeric(decryptedNumeric);
      }

  };

  module.exports = RSA;

}());

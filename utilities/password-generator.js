module.exports = {
 
    _pattern : /[a-zA-Z0-9_\-\+\.]/,
    
    
    _getRandomByte : function()
    {
      // http://caniuse.com/#feat=getrandomvalues
      if(global.crypto && global.crypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        global.crypto.getRandomValues(result);
        return result[0];
      }
      else if(global.msCrypto && global.msCrypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        global.msCrypto.getRandomValues(result);
        return result[0];
      }
      else
      {
        return Math.floor(Math.random() * 256);
      }
    },
    
    generate : function(length)
    {
      return Array.apply(null, {'length': length})
        .map(function()
        {
          var result;
          while(true) 
          {
            result = String.fromCharCode(this._getRandomByte());
            if(this._pattern.test(result))
            {
              return result;
            }
          }        
        }, this)
        .join('');  
    }    
      
  };
function document(item, depth, prefix, showFunctions) {
      if (depth==0)
        return;

      if (typeof(showFunctions)=='undefined')
        showFunctions=true;

      var iterations = 0;

      if (typeof(item)=='object') {
        var key;
        for(key in item) {
          iterations ++;
          if (iterations>30)
            return;
          if (typeof(item[key])=='object') {
            data[prefix+'.'+key] = '{object}';
            if (key!='xref') {
              document(item[key],depth-1,prefix+'_'+key,showFunctions);
            }
          }
          else {
            if (typeof(item[key])=='function') {
              if (showFunctions)
                data[prefix+'.'+key] = ' {function}';
            }
            else {
              try {
                data[prefix+'.'+key] =String(item[key]);
                if (isDict(item)) {
                  data[prefix+'.'+key+(dv)] =String(item.get(key));
                }
              }
              catch(e) {
                data[prefix+'.'+key] = ' ** '+typeof(item[key])+' : '+e.message;
              }
            }
          }
        }
      }
    }

    function dictExplorer(dict, depth) { // because get() can lead to results I don't want
      if (depth==0)
        return {'exceededDepth':true};

      var returnObj = {}
      var iterations = 0;

      if (typeof(dict)=='object') {
        var key;
        for(key in dict) {
          iterations ++;
          if (iterations>30)
            return {'exceededLimit':true};
          if (typeof(dict[key])=='object') {
            if (key!='xref') {
              returnObj[key] = dictExplorer(dict[key],depth-1);
            }
          }
          else {
            try {
              if (typeof(dict[key])!='function') {
                returnObj[key] =String(dict[key]);
                //if (isDict(dict)) {
                //  returnObj[key+'(dv)'] =String(dict.get(key));
                //}
              }
            }
            catch(e) {
              returnObj[key] = ' ** '+typeof(dict[key])+' : '+e.message;
            }
          }
        }
      }
      return returnObj;
    }
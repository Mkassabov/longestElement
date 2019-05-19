console.time('runtime');
let longestWord = '';
let words;
const symbols = [
                  'h','he','li','be','b','c','n','o','f','ne','na','mg','al','si','p','s','cl','ar','k',
                  'ca','sc','ti','v','cr','mn','fe','co','ni','cu','zn','ga','ge','as','se','br','kr','rb',
                  'sr','y','zr','nb','mo','tc','ru','rh','pd','ag','cd','in','sn','sb','te','i','xe','cs',
                  'ba','la','ce','pr','nd','pm','sm','eu','gd','tb','dy','ho','er','tm','yb','lu','hf','ta',
                  'w','re','os','ir','pt','au','hg','ti','pb','bi','po','at','rn','fr','ra','ac','th','pa',
                  'u','np','pu','am','cm','bk','cf','es','fm','md','no','lr','rf','db','sg','bh','hs','mt',
                  'ds','rg','cn','nh','fl','mc','lv','ts','og'
                ];

fetch('words.txt')
.then(response => response.text())
.then(text => {
  
  words = text;
  words = words.split("\n");
  console.log(words);

  for(var i = 0; i < words.length; i++) {
      if(words[i].length <= longestWord.length) {
        continue;
      }
      if(segmentString(words[i],symbols) != null) {
        longestWord = words[i];
      }
  }
  console.log(segmentString(longestWord, symbols));
  console.timeEnd('runtime');
})

function segmentString(input, dict) {
  if (dict.includes(input)) return input;
  var len = input.length;
  for (var i = 1; i < len; i++) {
    var prefix = input.substring(0, i);
    if (dict.includes(prefix)) {
      var tempDict = dict.slice();
      tempDict = tempDict.filter(e => e !== prefix);
      var suffix = input.substring(i, len);
      var segSuffix = segmentString(suffix, tempDict);
      if (segSuffix != null) {
        return prefix + " " + segSuffix;
      }
    }
  }
  return null;
}
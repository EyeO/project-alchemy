//Proto script - http://javascript.info/tutorial/inheritance
  function inherit(proto) {
      function F() {}
      F.prototype = proto;
      return new F();
  }

  //Format large numbers - http://stackoverflow.com/a/17633552
  var ranges = [
    { divider: 1e30 , suffix: 'W' },
    { divider: 1e27 , suffix: 'X' },
    { divider: 1e24 , suffix: 'Y' },
    { divider: 1e21 , suffix: 'Z' },
    { divider: 1e18 , suffix: 'E' },
    { divider: 1e15 , suffix: 'P' },
    { divider: 1e12 , suffix: 'T' },
    { divider: 1e9 , suffix: 'G' },
    { divider: 1e6 , suffix: 'M' },
    { divider: 1e3 , suffix: 'k' }
  ];

  function formatNumber(n) {
    for (var i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toString() + ranges[i].suffix;
      }
    }
    return n.toString();
  }

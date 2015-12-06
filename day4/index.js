var crypto = require('crypto');
var name = 'yzbqklnj';
var i = 0;

do {
  var hash = crypto.createHash('md5').update(name+''+i).digest('hex');
  i++;
}
while (hash.substring(0,6) != '000000');

console.log(--i); // 9b74c9897bac770ffc029102a200c5de

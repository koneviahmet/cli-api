/* dosya işlemleri modulunu entegre edelim */
const fs = require('fs');

/* komut satırının başlatıldığı dizini alalım */
const dizin = process.env.PWD;

/* bu uygulamanın yüklü olduğu dizin */
const dir = __dirname;


/* sayfayı kaydet */
const pageCreate = require('./create/page.js');
const fileCreate = require('./create/file.js');


/* exportlar içinde bir promise yapalım  kanka */

async function olustur(proje_name){
  await pageCreate.create(proje_name);
  await fileCreate.create(proje_name);
}


module.exports.create = olustur;

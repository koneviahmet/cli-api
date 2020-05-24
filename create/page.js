const fs = require('fs');

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
dir = dir.replace("/create", "");


const copy_package = (page, where) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(dir + '/copy/' + page, where, (err) => {
      if(err){
        reject("1 - kopyalama anında hata oldu");
      }else{
        resolve("1 - kopyalama tamam");
      }
    });
  });
}


const create = (page) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(page, { recursive: true }, (err) => {
      if(err){
        reject("2 - dosya oluşturma anında hata oldu");
      }else{
        resolve("2 - dosya oluşturma tamam");
      }
    });
  })
}


const file_create = (file) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, 'Learn Node FS module', function (err) {
      if(err){
        reject("7 - file  ekleme anında hata oldu");
      }else{
        resolve("7 - file  ekleme tamam");
      }
    });

  });
}


// async/await
async function asenkronAkis(proje_name){
    try {
      await copy_package('package.json','package.json');
      await create("arakatman");
      await create("bin");
      await create("helper");
      await create("models");
      await create("public");
      await create("public/images");
      await create("public/javascript");
      await create("public/stylesheets");
      await create("routes");
      await create("views");
      await copy_package('User.js','models/User.js');
      await copy_package('.env','.env');
      await copy_package('app.js','app.js');
      await copy_package('db.js','helper/db.js');
      await copy_package('register.js','routes/register.js');
      await copy_package('indexRouter.js','routes/index.js');
      await copy_package('tokendogrula.js','arakatman/tokendogrula.js');
      await copy_package('www','bin/www');
      await copy_package('error.jade','views/error.jade');
      await copy_package('index.jade','views/index.jade');
      await copy_package('layout.jade','views/layout.jade');

      console.log("Dosyalar Kopyalandı..");
    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;

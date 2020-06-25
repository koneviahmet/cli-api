const fs = require('fs');
const _           = require('lodash');

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
dir = dir.replace("/create", "");
if(process.env.OS == "Windows_NT"){ dir = slash(dir);}

const copy_file = (page, where) => {
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


const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function read(err, data) {
      if(err){
        reject("file okuma hatası");
      }else{
        resolve(data);
      }
    });
  });
}


const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if(err){
        reject("file okuma hatası");
      }else{
        resolve(data);
      }
    });
  });
}



const replaceFile = (data,bunu,bunla) => {
  return new Promise((resolve, reject) => {
      var res = _.replace(data, new RegExp(bunu,"g"), bunla);
      if(!res){
        reject("file okuma hatası");
      }else{
        resolve(res);
      }
  });
}


const createFile = (file, text) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, text, function (err) {
      if(err){
        reject("7 - file  ekleme anında hata oldu");
      }else{
        resolve("7 - file  ekleme tamam");
      }
    });

  });
}




const shemaArrCreate = (secJson) => {
  return new Promise((resolve, reject) => {
    let arrText = "";
    let i = 0;
   _.forEach(secJson, function(value) {
       i++;
       if(value.typeExtra.length == 0){
           arrText += value.adi+":"+value.type;
           arrText += (i == secJson.length ? '\n': ',\n');
       }else{
         arrText += value.adi+":{ \n type: "+value.type + ', \n';

         let x = 0;
         _.forEach(value.typeExtra, function(valuex) {
           x++;
           arrText += ' ' + valuex;
           arrText += (x == value.typeExtra.length ? '': ',\n');
         });

         arrText += (i == secJson.length ? '\n} \n': '\n},\n');
       }

   });

   resolve(arrText);
  });
}





// async/await
async function asenkronAkis(table_name, secJson){
    try {
      //table_name => hepsi_kucuk
      const table_nameUF = _.upperFirst(table_name);

      /*
      [
        { adi: 'asd', type: 'String', typeExtra: [] },
        { adi: 'asd', type: 'String', typeExtra: [ 'required: true' ] },
        { adi: 'cafer',type: 'Number',typeExtra: [ 'required: true', 'min: 5' ] }
      ]
      */

      const shemaPageDir = 'models/'+table_nameUF+'.js';

      await copy_file('shemaTaslak.js', shemaPageDir);
      const shemaPage             = await readFile('models/'+table_nameUF+'.js');

      /* shema isimlerini düzenleyelim */
      let packageProjeReplace  = await replaceFile(shemaPage.toString(), 'table_nameKankaSchema', table_nameUF+'Schema');
      packageProjeReplace   = await replaceFile(packageProjeReplace.toString(), 'table_nameKanka', table_name);

      /* shema dizi yapısını ayarlayalım */
      const shemaArr = await shemaArrCreate(secJson);
      packageProjeReplace   = await replaceFile(packageProjeReplace.toString(), 'shemaArr', shemaArr);

      /* shema değişikliklerini shema dosyasına kaydedelim */
      const packageProjeYaz       = await writeFile(shemaPageDir, packageProjeReplace);


      /* app.js sayfasına ekleyelim */
      const appJsFile  = await readFile('app.js');
      const newrouterAdd = "const "+table_name+"Router = require('./routes/"+table_name+"');\n//newrouter";
      let appJsFileReplace  = await replaceFile(appJsFile.toString(), '//newrouter', newrouterAdd);



      const newUserAdd = "app.use('/api/"+table_name+"', "+table_name+"Router);\n////useRouter";
      appJsFileReplace  = await replaceFile(appJsFileReplace, '//useRouter', newUserAdd);

      /* app.js değişikliklerini yazalım */
      const appJsFileYaz       = await writeFile('app.js', appJsFileReplace);


      /* routes dosyasını oluşturalım */
      await copy_file('newRoutes.js', 'routes/'+table_name+'.js');


      /* routes dosyasını düzenlleyelim  */
      const routesFile  = await readFile('routes/'+table_name+'.js');
      let routesFileReplace  = await replaceFile(routesFile.toString(), 'buyukDbAdi', table_nameUF);
      routesFileReplace  = await replaceFile(routesFileReplace, 'kucukDbadi', table_name);

      /* routes file değişikliklerini yazalım */
      await writeFile('routes/'+table_name+'.js', routesFileReplace);


    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;

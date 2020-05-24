const fs = require('fs');

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
dir = dir.replace("/create", "");


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
      var res = data.replace(bunu, bunla);
      if(!res){
        reject("file okuma hatası");
      }else{
        resolve(res);
      }
  });
}





// async/await
async function asenkronAkis(proje_name){
    try {
      const packageProje          = await readFile('package.json');
      const packageProjeReplace   = await replaceFile(packageProje.toString(), '[proje_name]', proje_name);
      const packageProjeYaz       = await writeFile('package.json', packageProjeReplace);


      /* env dosyasını değiştirelim */
      const envProje          = await readFile('.env');
      const envProjeReplace   = await replaceFile(envProje.toString(), 'database_adi', proje_name);
      const envProjeYaz       = await writeFile('.env', envProjeReplace);

      //console.log(copyx);
      //console.log(silx);
      console.log("Proje ismi tanımlandı.");

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;

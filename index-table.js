/* dosya işlemleri modulunu entegre edelim */
const fs          = require('fs');
const _           = require('lodash');
const prompts     = require('prompts');
const tableCreate = require('./create/table.js');


let sec = [];


/* komut satırının başlatıldığı dizini alalım */
const dizin = process.env.PWD;

/* bu uygulamanın yüklü olduğu dizin */
const dir = __dirname;
if(process.env.OS == "Windows_NT"){ dir = slash(dir);}


const sor = (table_name) => {
  new Promise(function(resolve, reject) {
    /* sor cevapla 1 */
    (async () => {
      /* kaç db olacağını seçiyoruz */
      const response = await prompts({
        type: 'number',
        name: 'dbAdet',
        message: 'Tabloda kaç adet db olacak?',
        validate: value => value > 1 ||  value < 50 ? true: `Nightclub is 18+ only`
      });


      /* seçilen db lere isim veriyoruz */
      for (var i = 1; i < response.dbAdet + 1; i++) {
        let responseSutunAdi = await prompts({
          type: 'text',
          name: 'dbAdi',
          message: i + '. Sutun Adı'
        });

        /* type seçelim */
        let responseSutunType = await prompts(
        {
            type: 'select',
            name: 'sutunType',
            message: 'Sutun Tipini Seçiniz',
            choices: [
              { title: 'String', value: 'String' },
              { title: 'Number', value: 'Number' },
              { title: 'Date', value: 'Date' },
              { title: 'Boolean', value: 'Boolean' },
              { title: 'ObjectId', value: 'Schema.Types.ObjectId' },
              { title: 'Array', value: '[]' }
              ],
          });


          let choices = [];
          choicesStandart =  [{ title: 'required', value:'required: true'},
                              { title: 'select', value:'select: true'},
                              { title: 'index', value:'index: true'},
                              { title: 'unique', value:'unique: true'}];


          if(responseSutunType.sutunType == "String"){
            /* string değer seçerse */
            choices =  [{ title: 'lowercase', value:'lowercase: true'},
                        { title: 'uppercase', value:'uppercase: true'},
                        { title: 'trim', value:'trim: true'}];

          }else if(responseSutunType.sutunType == "Number"){
            /* number seçerse */
            choices =  [{ title: 'min', value:'min: 5'},
                        { title: 'max', value:'max: 1000'}];

          }else if(responseSutunType.sutunType == "Date"){
            /* Date seçerse */
            choices =  [{ title: 'default', value:'default: Date.now()'}];
          }



          let responseSutunTypeExtra = await prompts(
          {
              type: 'multiselect',
              name: 'sutunTypeExtra',
              message: responseSutunType.sutunType + ' extra tanımlama seçiniz. Boş bırakabilirsiniz.',
              choices: [...choicesStandart , ...choices],
          });


        /* buraya yeni seçenekler ekleyeceğiz */

        var db = {'adi':responseSutunAdi.dbAdi, 'type':responseSutunType.sutunType, 'typeExtra':responseSutunTypeExtra.sutunTypeExtra}
        sec.push(db);
      }


      /* create/table.js de gerekli kayıt işlemlerini yapalım */
      tableCreate.create(table_name, sec);

    })();


  });
}








/* sayfayı kaydet */

//const fileCreate = require('./create/file.js');


/* exportlar içinde bir promise yapalım  kanka */

async function olustur(table_name){
  /* tablo adını küçültelim */
  table_name = _.toLower(table_name);
  await sor(table_name);
}


module.exports.create = olustur;

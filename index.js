#!/usr/bin/env node
var clc           = require("cli-color");
const { program } = require('commander');
const fs          = require('fs');
const _           = require('lodash');

program.version('0.0.1');


program
  .option('-install, --install', 'kurulumu başlat')
  .option('-table, --table', 'tablo ekle')
  .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);


if(program.install){
  /* instal */
  if(process.argv.length != 4){
    console.log(clc.red("> cli-deneme -install <proje_name>"));
  }else{
    /* daha önce kurulmuşmu ona baklım */
    fs.readFile("package.json", function read(err, data) {
      if("5" != "5"){
      //if(data){
        console.log(clc.red("Daha önce kurulum yaptınız."));
      }else{
        /* tüm denetlemelerden geçti kur gitsin */
        const proje_name = process.argv[3];
        console.log(clc.green("Proje oluşturuluyor"));
        const ins = require('./index-install');
        ins.create(proje_name);
      }
    });

  }
}else if(program.table){

  const table_name = process.argv[3];
  console.log(clc.green("Tablo oluşturuluyor"));
  const ins = require('./index-table');
  ins.create(table_name);

}else{
  console.log(clc.red("> cli-deneme --help yazabilirsiniz.."));
}

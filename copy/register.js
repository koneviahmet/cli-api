const express = require('express');
const router = express.Router();

const User    = require('../models/User');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');


/* kullanıcı kaydedelim */
router.post('/', (req, res, next) => {
  const {username, password} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const  uye = new User({
      username: username,
      password: hash
    });
    const promise = uye.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
  });
  });


/* giriş işlemi yapalım token üreteceğiz */
router.post('/login', (req, res, next) => {

  const {username, password} = req.body;
  User.findOne({
    username: username
  },(err, data) => {
    if(!data){
      next({message: "bağlanma hatası", code: 1});
    }else{


      /* data geliyor ise şifresini de kontrol edelim */
      bcrypt.compare(password, data.password).then(function(result) {
        if(result){
          /* şifresi doğru ise token oluşturacağız */
          const payload = {
            username: username
          };

          //req.app.get('token_key') api.jsen den geldi rasgele bir anahtar
          const token = jwt.sign(payload, req.app.get('token_key'), {
            expiresIn: 720 //720 dakika geçerli olacak demektir.
          })

          res.json({status: 1, token: token});
        }else{
          next({message: "şifre hatası", code: 1});
        }

      });

    }

  });


});

module.exports = router;

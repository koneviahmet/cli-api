const express = require('express');
const router  = express.Router();
const buyukDbAdi = require('../models/buyukDbAdi');


/* bütün liste */
router.get('/', (req, res) => {
    const promise = buyukDbAdi.find({});
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});


/* tek liste alıyor */
router.get('/:kucukDbadi_id', (req, res, next) => {
  const {kucukDbadi_id} = req.params;
  const promise = buyukDbAdi.findById(kucukDbadi_id);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    next({message: "Sistemden kaynaklanan bir hata oldu.", code: 15});
  });
});




/* kaydet */
router.post('/', (req, res, next) => {

  const kucukDbadi = new buyukDbAdi({
    ...req.body
  });

  /* promise kullanarak kaydetme */
  const promise = kucukDbadi.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});


/* düzenle */
router.put('/:kucukDbadi_id', (req, res, next) => {
  const {kucukDbadi_id} = req.params;
  const duzenle    = req.body;

  const promise = buyukDbAdi.findByIdAndUpdate(kucukDbadi_id, duzenle);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    next({message: "Sistemden kaynaklanan bir hata oldu.", code: 15});
  });
});


/* sil */
router.delete('/:kucukDbadi_id', (req, res, next) => {
  const {kucukDbadi_id} = req.params;

  const promise = buyukDbAdi.findByIdAndRemove(kucukDbadi_id);
  promise.then((data) => {
    res.json({status: 1});
  }).catch((err) => {
    next({message: "Sistemden kaynaklanan bir hata oldu.", code: 15});
  });
});


module.exports = router;

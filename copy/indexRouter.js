const express = require('express');
const router = express.Router();

/*
localhost:3001/
Anasayfaya istek geldiği zaman bu kısım çalışacak
*/
router.get('/', (req, res, next) => {
  res.json('herşey yolunda...');
});

module.exports = router;

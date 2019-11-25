var express = require('express');
var router = express.Router();
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_info', {
    username: typeof req.user == 'undefined' ? 'Guest' : req.user.username,
  });
});

router.post('/upload_avatar', (req, res) => {
  const busboy = new Busboy({headers: req.headers});

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const newFileName = 'avatar.jpg';
    const saveTo = path.join(process.cwd(), `public/${newFileName}`);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', () => {
    res.redirect('/users');
  })

  return req.pipe(busboy);
});


module.exports = router;

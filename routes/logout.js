const express = require('express');
const router = express.Router();

router.delete('/', (req, res, next) => {
    req.logOut();
    res.redirect('/login');
});


module.exports = router;
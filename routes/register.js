const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userUtils = require('../controller/utils/user_utils');

router.get('/', (req, res, next) => {
    res.render('register');
});

router.post('/', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const username = req.body.username;
        if(userUtils.checkUsernameExist(username)){
            return res.redirect('/register');
        }

        userUtils.addNewUser({
            id: Date.now().toString(),
            username: username,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});


module.exports = router;
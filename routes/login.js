const express = require('express');
const router = express.Router();

const loginRouter = passport => {
    router.get('/', (req, res, next) => {
        res.render('login');
    });
    
    const loginSetting = {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    };
    router.post('/', passport.authenticate('local', loginSetting));

    return router;
}


module.exports = loginRouter;
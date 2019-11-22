const checkRequestAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
}

const checkRequestNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return next();
}

module.exports = {
    checkRequestAuthenticated,
    checkRequestNotAuthenticated
}
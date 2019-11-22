const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userUtils = require('./utils/user_utils');

const initializePassportAuthen = (passport) => {
    const strategyConfig = {
        usernameField: 'username',      // Note: the variable name "username" and "password" must be the same with strategyHandler()
        passwordField: 'password'
    };
    const strategyHandler = async (username, password, done) => {
        const user = userUtils.getUserByUsername(username);

        if(user == null){
            return done(null, false, { message: 'Username is invalid!'});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }

            return done(null, false, { message: 'Password is invalid!'});
        } catch {
            return done(e);
        }
    }

    const authenStrategy = new localStrategy(strategyConfig, strategyHandler);
    passport.use(authenStrategy);

    passport.serializeUser((user, done) => done(null, user.id));                    // 
    passport.deserializeUser((id, done) => done(null, userUtils.getUserById(id)));
    
    /*
    * passport.serializeUser: save id of user for recognizing in later requests, run when login success 
    * passport.deserializeUser: used for get user's info in req.user, run in every requests later
    * Ref: https://stackoverflow.com/questions/28691215/when-is-the-serialize-and-deserialize-passport-method-called-what-does-it-exact
    */
}

module.exports = initializePassportAuthen;
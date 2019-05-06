const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Storage = require('../database/database_config')
const options = {}
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'StarkIndustries';

module.exports = passport => {
    passport.use(new JWTStrategy(options , (jwt_payload , done) => {
        Storage.users.findOne({
            where : {
                id : jwt_payload.id
            }
        }).then(isSuccess => {
            if(isSuccess){
                return done(null , true)
            } else if(isSuccess == null){
                return done(null , false);
            }
        })
    }))
}
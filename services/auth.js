const {User} = require("../models/");
const {privateKey:key} = require("../config");
const jwt = require("jsonwebtoken");
const ONE_DAY_SEC = 24 * 60 * 60;

module.exports = {
    "verify": async (token, redisClient = null) => {
        try {
            const result = await new Promise((resolve, reject) => {redisClient.get(`auth:${token}`, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })});

            if (result) {
                throw new Error("Invalid token.");
            } else {
                return jwt.verify(token, key);
            }
        } catch (err) {
            throw err;
        }
    },
    "login": async (username, password) => {
        try {
            const user = await User.findOne({"username":username});
            if (await user.validatePassword(password)) {
                return {
                    token: jwt.sign({id:user.id, role:user.role}, key, {expiresIn:ONE_DAY_SEC}),
                    user: (await user.populate("role").execPopulate()).toObject()
                }
            }
            return {
                token: null,
                user: null
            };
        } catch (err) {
            throw err;
        }
    },
    "logout": async (token, redisClient) => {
        await redisClient.setex(`auth:${token}`, ONE_DAY_SEC, token);
        return true;
    }
}
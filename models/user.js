const {Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const User = new Schema({
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    nickname: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    active: Boolean
});

User.methods.validatePassword = function(password) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, matched) => {
            if (err) {
                reject(err);
            } else {
                resolve(matched);
            }
        })
    });
};

User.pre("save", function(next){
    user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = User;
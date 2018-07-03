console.log('starting guests schema');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const {
    Schema,
    pre
} = mongoose;

const guestSchema = new Schema({

    food: {

        type: String,
        default: null

    },
    like: {

        type: Boolean,
        default: false

    },
    dislike: {

        type: Boolean,
        default: false

    },
    title: {

        type: String,
        required: true,
        trim: true,
        minlength: true

    },
    comments: {

        type: String,
        required: true,
        trim: true,
        minlength: true

    },
    email: {

        type: String,
        required: true,
        trim: true,
        minlength: true,
        validate: {

            validator: validator.isEmail,
            message: 'Your email is invalid.'

        }

    },
    password: {
        // Token will not be used for the simple guestbook.
        type: String,
        required: true,
        minlength: 4

    },
    servDislike: {

        type: Boolean,
        default: false

    },
    servComments: {

        type: String,
        //required: true,
        trim: true,
        minlength: true

    },
    visitedAt: {

        type: String,
        default: null

    },
    telephone: {

        // it is an option to the customer
        type: String,
        trim: true,
        minlength: true,
        validate: {

            validator: function(value) {

                const numRegex = /^\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}$/;

                return numRegex.test(value);

            },
            message: '{VALUE} is not a valid phone number!'

        }

    },
    city: {

        type: String,
        default: null

    }

});

guestSchema.pre('save', function(next) {

    console.log('this******************: ', this);
    const guest = this;

    if (guest.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(guest.password, salt, (err, hash) => {

                guest.password = hash;
                next();

            });

        });

    } else {

        next();

    }

});

guestSchema.statics.findByCredentials = function (email, password) {

    const Guest = this;

    let guestGroup = [];    

    let count = 1;

    return Guests.find({ email }).then( (guests) => {

        if(!guests) return Promise.reject();

        return new Promise ((resolve, reject) => {

           guests.map(guest => {

                bcrypt.compare(password, guest.password, (err, res) => {

                    if(err) Promise.reject();

                    if(res) guestGroup.push(guest);

                    if (guests.length === count) {

                        guestGroup.length > 0 ? resolve(guestGroup) : reject();
                    
                    }

                    count++;

                });

            });

        });

    });

}

// In order to apply validation to the entire PATCH
guestSchema.pre('findOneAndUpdate', function(next) {

    this.options.runValidators = true;

    next();

});

const Guests = mongoose.model('guests', guestSchema);

module.exports = {
    
    Guests

};
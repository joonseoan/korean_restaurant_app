const mongoose = require('mongoose');

const GuestLogin = mongoose.model('guestbook', {

    _user: {

        type: String

    },
    food: {

        type: String

    },
    like: {

        type: Boolean

    },
    dislike: {

        type: Boolean

    },
    title: {

        type: String

    },
    comments: {

        type: String
        
    },
    email: {

        type: String

    },
    password: {

        type: String

    },
    servDislike: {

        type: Boolean

    },
    servComments: {

        type: String

    },
    visitedAt: {

        type: String

    },
    telephone: {

        type: String

    },
    city: {

        type: String

    }

});

module.exports = { GuestLogin };
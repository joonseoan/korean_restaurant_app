// It is an interim solution to give permission to the localhost front end.
// const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

require('./db/mongoose');
require('./restaurant_configs/config');  // because of PORT.
const { Guests } = require('./models/guests');
const { GuestLogin } = require('./models/guestLogin');
const { ObjectID } = require('mongodb');

const app = express();

app.use(bodyParser.json());

// app.use(cors());

const PORT = process.env.PORT || 3000;
//console.log(`starting on ${PORT}`);
app.listen(PORT);


app.post('/guests', (req, res) => {

   const body = _.pick(req.body, [ 'food', 'like', 'dislike', 'title', 'comments', 'email', 'password', 
            'servDislike', 'servComments', 'telephone' ]);

   console.log('req.body.city:', req.body.city);

    if( body.title && body.comments && body.email && body.password ) {

        const date = new Date();
        const vancouverTime = new Date(date.getTime() - 10800000);

        if(req.body.city !== 'Vancouver') {

            body.visitedAt = `(Date: ${date.toDateString()}, Time: ${date.toLocaleTimeString()})`;

        } else {

            body.visitedAt = `(Date: ${vancouverTime.toDateString()}, Time: ${vancouverTime.toLocaleTimeString()})`;

        }

        body.city = req.body.city;

    }

    new Guests(body).save().then((result) => {

            console.log('result sending to the user: ', result);

            res.send(result);

        }, (err) => {

            res.status(400).send(err);

        });

});

app.get('/guests', (req, res) => {

    Guests.find({}).then( (list) =>{

        res.send({ list });

    }).catch( (err) => res.status(400).send(err));

});

app.get('/guests/:id', (req, res) => {

    console.log(req.pa)

    const id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Guests.findById(id).then( (post) => {

        if(!post) return res.status(404).send();

        res.send({ post }); 
    
    }).catch((err) => res.status(400).send());

});

app.delete('/guests/:id', (req, res) => {

    const id = req.params.id;

    if(!ObjectID.isValid(id)) return res.status(404).send();

    Guests.findByIdAndRemove(id).then((post) => {

        if(!post) return res.status(404).send();

        res.send({ post });

    }).catch((err) =>  {
        
        res.status(400).send(err);

    });

    GuestLogin.findByIdAndRemove(id).then((post) => {

        if(!post) return res.status(404).send();

        res.send({ post });

    }).catch((err) =>  {
        
        res.status(400).send(err);

    });

});

/* Try on this after 2nd project
app.patch('/guests/:id', (req, res) => {

    const id = req.params.id;

    const body = _.pick(req.body, [ 'food', 'like', 'dislike', 'title', 'comments', 'email', 'password', 
            'servDislike', 'servComments', 'telephone' ]);

    if(!ObjectID.isValid(id)) return res.status(404).send();

    if( body.title && body.comments && body.password && body.email) {

        // I gotta change it for Vancouver.
        const estTime = new Date();

        body.visitedAt = estTime.setHours(estTime.getHours() + estTime.getTimezoneOffset()/60 - 8);

    }

    // For patch to be validated, put "runValidators : true"
    Guests.findOneAndUpdate( { _id : id }, { $set : body }, { new: true }).then (updated => {

            if(!updated) return res.status(404).send();

            res.send({ updated });
        
    }).catch(err => res.status(400).send());

});

*/

app.post('/guests/login', (req, res) => {

    const body = _.pick(req.body, [ 'email', 'password' ]);

    console.log('body: ', body.email);

    Guests.findByCredentials(body.email, body.password).then((guest) => {

        if(!guest) return Promise.reject();

        GuestLogin.remove({}).then(() => {
            
            GuestLogin.insertMany(guest);
            
        });

        res.send(guest);

    }).catch((err) => res.status(400).send());

});

// route must be a single route for 'GET'!!!!
app.get('/loginGuestbooks', (req, res) => {

    GuestLogin.find({}).then(guestbooks => {

        res.send({ guestbooks });

    }).catch( (err) => res.status(400).send(err));

});

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
    
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
    });

}

module.exports = { app };

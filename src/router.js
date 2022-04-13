const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};
const secret = 'mysecretkey'

router.post('/login', (req, res) => {
    if (req.body.username === mockUser.username && req.body.password === mockUser.password) {
        const payLoad = {
            username: mockUser.username,
            age: mockUser.profile.age
        }
        const newToken = jwt.sign(payLoad, secret)
        res.json({ login: newToken })
    } else {
        res.status(400)
        res.json({ error: 'invalid credentials' })
    }
});

router.get('/profile', (req, res) => {
    const token = req.headers["authorization"]
    try {
        const payLoad = jwt.verify(token, secret)
        console.log('valid', payLoad)
        res.json({ profile: mockUser.profile })
    } catch (e) {
        res.status(401)
        res.json({ error: 'not valid' })
    }

    console.log(token)
});

module.exports = router;

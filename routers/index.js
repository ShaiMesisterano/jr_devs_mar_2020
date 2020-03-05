const express = require('express');
const router = express.Router();

router.post('/register', (request, response) => {
    const username = request.body.username;
    request.session.username = username;
    response.redirect('/gallery.html');
})

module.exports = router;
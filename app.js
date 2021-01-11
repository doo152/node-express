const express = require('express');
const session = require('express-session');
var app = express();

// Use the session middleware
app.use(session({
    // name: cookie name, default cookie name: connect.sid
    name: 'zhk',
    secret: '9283usaf98yjshf',
    cookie: ('name', 'value',{path: '/', httpOnly: true, secure: false, maxAge: 60 * 1000}),
    //resave: default is true, but need to be presented
    resave: true,
    // save "uninitialized" to storage
    saveUninitialized: true
}));

app.get('/', (req, res, next) => {
    var sess = req.session;
    if(sess.views) {
        sess.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>Welcome your No#' + sess.views +' visits! Expires in ' + (sess.cookie.maxAge / 1000) +'s</p>');
        res.end();
    } else {
        sess.views = 1;
        res.end('Welcome to the session demo, refresh!!');
    }
});

app.listen(3000);
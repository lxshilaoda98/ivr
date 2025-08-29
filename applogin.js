


const express = require('express');
const app = express();

const sessions = {};

app.use(express.urlencoded({ extended: true }));

// Middleware to check if user is logged in
app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/login.html') {
    return next();
  }

  const cookie = req.headers.cookie;
  if (cookie) {
    const parts = cookie.split('=');
    if (parts[0] === 'sessionId') {
      const sessionId = parts[1];
      if (sessions[sessionId]) {
        return next();
      }
    }
  }

  res.redirect(`/login.html?redirectUrl=${encodeURIComponent(req.originalUrl)}`);
});

app.get('/login.html', function (req, res) {
  res.sendFile( __dirname + "/login.html" );
})

app.post('/login', function (req, res) {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    const sessionId = Date.now().toString();
    sessions[sessionId] = { username: 'admin' };
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; Path=/`);
    if (req.body.redirectUrl) {
      res.redirect(req.body.redirectUrl);
    } else {
      res.redirect('/index.html');
    }
  } else {
    res.send('Login failed');
  }
});

app.use(express.static('./dist'))
app.use(express.static(__dirname));

app.get('/index.html', function (req, res) {
  res.sendFile( __dirname + "/dist/index.html" );
})

app.listen(8083,function(err){  //8080
  if(err){
    console.log(err);

  }else {
    console.log('IVR Server Success ..'+8083)
  }
})

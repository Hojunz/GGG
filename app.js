const express  = require('express');
const path     = require('path');
const fs       = require('fs')

const app      = express();


// require ------------------------------------------------------------

// 포트 3000, ejs사용--------------------------------------------------
app.set('port', process.env.PORT || 9999)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// --------------------------------------------------------------------

app.get('/', (req, res) => {
      res.render('index')
});

  
app.get('/homeimg', (req, res) => {
    fs.readFile(__dirname + '/public/images/homePng4.png', (err, data) => {
      if (err) {
        return res.send('Error Occured');
      }
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data);
    });
});

app.get('/homeicon', (req, res) => {
    fs.readFile(__dirname + '/public/images/laundry.jpg', (err, data) => {
      if (err) {
        return res.send('Error Occured');
      }
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.end(data);
    });
});

app.get('/homevideo', (req, res) => {
    fs.readFile(__dirname + '/public/images/video.mp4', (err, data) => {
      if (err) {
        return res.send('Error Occured');
      }
      res.writeHead(200, {'Content-Type': 'video/mp4'});
      res.end(data);
    });
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/postlaundry', (req, res) => {
    res.render('postlaundry')
})

app.get('/boss', async (req, res) => {
    res.render('boss')
})


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
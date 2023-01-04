// const express = require("express");
// const fs       = require('fs')
// const router = express.Router();


// router.get('/homeimg', (req, res) => {
//     fs.readFile(__dirname + '/public/images/homePng4.png', (err, data) => {
//       if (err) {
//         return res.send('Error Occured');
//       }
//       res.writeHead(200, {'Content-Type': 'image/png'});
//       res.end(data);
//     });
// });

// router.get('/homeicon', (req, res) => {
//     fs.readFile(__dirname + '/public/images/laundry.jpg', (err, data) => {
//       if (err) {
//         return res.send('Error Occured');
//       }
//       res.writeHead(200, {'Content-Type': 'image/jpg'});
//       res.end(data);
//     });
// });

// router.get('/homevideo', (req, res) => {
//     fs.readFile(__dirname + '/public/images/video.mp4', (err, data) => {
//       if (err) {
//         return res.send('Error Occured');
//       }
//       res.writeHead(200, {'Content-Type': 'video/mp4'});
//       res.end(data);
//     });
// });

// module.exports = router;
const http = require('http');
const fs = require('fs');
const _ = require('lodash');
Math.random(2);
const server = http.createServer((req, res) => {
   console.log('request made');

   // set header content type
   res.setHeader('Content-Type', 'text/html');
   // send html file
   let path = './views/';
   switch (req.url) {
      case '/':
         path += 'index.html';
         res.statusCode = 200;
         break;
      case '/about':
         path += 'about.html';
         res.statusCode = 200;
         break;
      case '/about/me':
         res.statusCode = 301;
         res.setHeader('Location', '/about');
         res.end();
         break;
      default:
         path += '404.html';
         res.statusCode = 404;
         break;
   }

   fs.readFile(path, (err, data) => {
      if (err) {
         console.log(err.message);
         res.end();
      } else {
         res.write(data);
         res.end();
      }
   });
});

server.listen(3000, 'localhost', () => {
   console.log('Listening for req on port 3000');
});

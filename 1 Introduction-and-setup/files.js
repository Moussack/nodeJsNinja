const fs = require('fs');

const write = (nm, content) => {
   fs.writeFile(`./docs/${nm}.txt`, `${content}`, (err) => {
      if (err) {
         console.log(err);
      }
      console.log(`${nm} was written`);
   });
};
const mkdirz = (nm) => {
   if (!fs.existsSync(`./${nm}`)) {
      fs.mkdir(`./${nm}`, (err) => {
         if (err) {
            console.log(err.message);
         }
         console.log(`${nm} folder created`);
      });
   } else {
      console.log(`${nm} folder already exist`);
   }
};
const deletezMe = (nm) => {
   if (fs.existsSync(`./docs/${nm}`)) {
      fs.unlink(`./docs/${nm}`, (err) => {
         if (err) {
            console.log(err.message);
         }
         console.log(`${nm} file deleted`);
      });
   }
};

const readStream = fs.createReadStream(`./docs/blog1.txt`, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(`./docs/blog4.txt`);

/* readStream.on('data', (chunk) => {
   console.log('---------- NEW CHUCNK ------------');
   console.log(chunk);
   writeStream.write('\nNEW CHUNK\n');
   writeStream.write(chunk);
}); */

readStream.pipe(writeStream);

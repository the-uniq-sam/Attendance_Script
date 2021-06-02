//serving static files using express
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
// const LimitingMiddleware = require('limiting-middleware');

// app.use(new LimitingMiddleware({ limit: 1, resetInterval: 60000 }).limitByIp());
// 100 request limit. 1200000ms reset interval (20m).

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5*60*1000, // 15 minutes
  max: 1, 
});

app.use(limiter);

const readStream = fs.createReadStream('./Keys_To_Reset.txt', 'utf8');

readStream.on('data', (chunk)=>{
    console.log(chunk);
    limiter.resetKey(chunk);
});

// limiter.resetKey(1621752426);


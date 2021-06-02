//serving static files using express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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
  max: 2, // limit each IP to 100 requests per windowMs
//   headers: true
});

app.use("/our_path", limiter);


// app.use('/public', express.static(path.join(__dirname,'static')));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(bodyParser.text({ type: 'text/html' }));

app.get('/our_path', (req,res)=>{
	// res.send('hello world');
	res.sendFile(path.join(__dirname,'static', 'our_path.html'));
});

app.post('/our_path', (req,res)=>{
	//to send to some file
	// console.log(req.body['Name']);
	let ts = Date.now();
	let date_ob = new Date(ts);
	let date = date_ob.getDate();
	let month = date_ob.getMonth() + 1;
	let year = date_ob.getFullYear();
	// console.log(year+"-"+month+"-"+date+","+req.body['Name'][0]+","+req.body['Name'][1]);
	let to_send = year+"-"+month+"-"+date+","+req.body['Name'][0]+","+req.body['Name'][1];
	fs.appendFile('attend.csv', to_send+'\n', (err)=>{
		if(err)
			console.log(err);
		else
			console.log("Succesfully append file");
	});

	// console.log("running");
	console.log(res.getHeader('X-RateLimit-Reset'));
	fs.appendFile('Keys_To_Reset.txt', res.getHeader('X-RateLimit-Reset')+'\n', (err)=>{
		if(err)
			console.log(err);
		else
			console.log("Succesfully append file");
	});
	
	// database work here
	res.send('succesfully posted data');
});

app.listen('3000');

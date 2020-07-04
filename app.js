var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');
var rfs = require('rotating-file-stream');
var auth = require('./api/middleware/auth');

// Routes
var authRoutes = require('./api/components/auth/routes');
var userRoutes = require('./api/components/user/routes');
var autoRoutes = require('./api/components/automobile/routes');
var partRoutes = require('./api/components/part/routes');
var dashRoutes = require('./api/components/dash/routes');

var app = express();

// Create a rotating write stream for log files
const pad = num => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
	if (!time) return `_file.log`;

	var month = pad(time.getMonth() + 1);
	var year = time.getFullYear();
	var day = pad(time.getDate());
	return `${day}_${month}_${year}-file${index}.log`;
};

var accessLogStream = rfs.createStream(generator, {
	size: '5M', // maxsize
	interval: '1d', // rotate daily
	compress: true, // compress rotated files
	path: path.join(__dirname, 'log')
});

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('common'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Setup CORS
app.use(cors());

//#FT-01# Verify JWT in all requests
app.use(auth, function (req, res, next) {
	next();
});

// Setup routes that will handle the requests
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auto', autoRoutes);
app.use('/api/part', partRoutes);
app.use('/api/dash', dashRoutes);

// Setup NOT FOUND response
app.use((req, res, next) => {
	res.status(404).json({
		message: 'Página não encontrada!'
	});
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;

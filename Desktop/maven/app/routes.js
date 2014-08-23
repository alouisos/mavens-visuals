module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/video-0', function(req,res) { 
		res.render('video-0.ejs')
	});

	app.get('/video-2', function(req, res) { 
		res.render('video-2.ejs')
	});

	app.get('/video-4', function(req, res) { 
		res.render('video-4.ejs')

	
	}); 

	app.get('/video-5', function(req, res) { 
		res.render('video-5.ejs')
	});

	app.get('/video-6', function(req, res) { 
		res.render('video-6.ejs')
	});
	app.get('/video-7', function(req, res) { 
		res.render('video-7.ejs')
	});
	app.get('/video-8', function(req, res) { 
		res.render('video-8.ejs')
	});
	app.get('/video-9', function(req, res) { 
		res.render('video-9.ejs')
	});

	

app.use(function (req, res) { 
	res.render('404')
});

};
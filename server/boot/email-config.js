'use strict';

var DataSource = require('loopback-datasource-juggler').DataSource;
var dsSendGrid = new DataSource('loopback-connector-sendgrid', {
		    api_key: process.env.SENDGRID_API_KEY
});


module.exports = function(app) {

	app.models.Email.attachTo(dsSendGrid);
	if (process.env.TEST_EMAIL)
		setTimeout(function () {app.models.Email.send({
				to: "theophile759@gmail.com",
				from: "webmaster@theof.fr",
				subject: "Test",
				text: "Text message",
				html: "html <b>message</b>"
		}, function(err, result) {
		    if(err) {
					console.log('Upppss something crash', err);
					return;
				    }
		    console.log(result);
		});}, 5000);
};

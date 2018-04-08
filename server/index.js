'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

const app = express();
const sequelize = new Sequelize('wtg', null, null, {dialect: 'sqlite', storage: 'wtg.sqlite'});
const Toilet = sequelize.define('toilet', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	lat: {
		type: Sequelize.DOUBLE
	},
	lng: {
		type: Sequelize.DOUBLE
	},
	name: {
		type: Sequelize.STRING
	}
}, {
	tableName: 'wtg_toilet',
	createdAt: false,
	updatedAt: false
});
const Rating = sequelize.define('rating', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	score: {
		type: Sequelize.INTEGER
	}, 
}, {
	tableName: 'wtg_rating'
})
Toilet.hasMany(Rating);
Toilet.sync();
Rating.sync();

app.options('*', cors());
app.get('/toilet', cors(), function(request, response) {
	Toilet.findAll({include: [Rating]}).then(function(points) {
		response.setHeader('Content-Type', 'application/json');
		response.send(JSON.stringify(points));
	});
});

app.get('/toilet/:id', cors(), function(request, response) {
	Toilet.findById(request.params.id, {include: [Rating]}).then(function(toilet) {
		if(toilet != null) {
			response.json({toilet: toilet});
		}
		else
		{
			response.setHeader('Content-Type', 'application/json');
			response.json({toilet: null});
		}
	});
});

const jsonParser = bodyParser.json();
app.post('/toilet', cors(), jsonParser, function(request, response) {
	console.log(request.body);
	if(request.body.lat != null && request.body.lng != null && request.body.name != null) {
		Toilet.create({lat: request.body.lat, lng: request.body.lng, name: request.body.name}).then(function(toilet) {
			toilet.addRating({score: Number(request.body.score)});
			response.json({toilet: toilet});
		});
	}
	else {
		response.json({toilet: null});
	}
});

app.post('/toilet/:id/rating', cors(), jsonParser, function(request, response) {
	if(request.body.score != null && request.body.score >= 1 && request.body.score <= 5) {
		Toilet.findById(request.params.id).then(function(toilet) {
			if(toilet != null) {
				toilet.addRating({score: Number(request.body.score)});
				response.setHeader('Content-Type', 'application/json');
				response.json({toilet: toilet});
			}
			else {
				response.setHeader('Content-Type', 'application/json');
				response.json({toilet: toilet});
			}
		});
	}
});
app.listen(8000);

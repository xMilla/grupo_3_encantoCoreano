const fs = require('fs');
const path = require('path');

const loginController = {
	login: (req, res) => {
		res.render('login');
	},
	registro: (req, res) => {
		res.render('registro');
	},
};

module.exports = loginController
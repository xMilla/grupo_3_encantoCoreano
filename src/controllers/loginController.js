const fs = require('fs');
const path = require('path');

const loginController = {
	login: (req, res) => {
		res.render('login');
	},
<<<<<<< HEAD
=======
	registro: (req, res) => {
		res.render('registro');
	},
>>>>>>> a29b505f61aed26ceed07a80eb39f71c26d4962b
};

module.exports = loginController
const fs = require('fs');
const path = require('path');

const loginController = {
	registro: (req, res) => {
		res.render('registro');
	},
};

module.exports = loginController
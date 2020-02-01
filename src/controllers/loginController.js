const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); 
const helperFunctions = require('../functions/helpers');

const loginController = {
	login: (req, res) => {
		res.render('login');
	},
	registro: (req, res) => {
		res.render('registro');
	},

	store: (req, res) => {
		const hasErrorGetMessage = (field, errors) => {
			for (let oneError of errors) {
				if (oneError.param == field) {
					return oneError.msg;
				}
			}
			return false;
		}
		
		let errorsResult = validationResult(req);

		if ( !errorsResult.isEmpty() ) {
			return res.render('registro', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body
			});
		} else {

	    // Asignar el nombre final de la imagen
		//req.body.foto = req.file.filename;
		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"
		let newUserData = {
			id: helperFunctions.generateUserId(),  
			avatar: req.file.filename,
			...req.body
		}
		// Guardo al usuario en el JSON
		helperFunctions.storeUser(newUserData);
		 
		 return res.send('<h1>Se registro correctamente</h1>');
		}
	},
};

module.exports = loginController
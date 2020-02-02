const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); 
const helperFunctions = require('../functions/helpers');
//const bcrypt = require('bcrypt');

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
	processLogin: (req, res) => {
		// Busco al usuario por email
		let userToLogin = helperFunctions.getUserByEmail(req.body.user_email);

		// Valido si existe el usuario
		if(userToLogin != undefined) {
			// Magia	if (bcrypt.compareSync(req.body.user_password, userToLogin.user_password))
			if (req.body.user_password == userToLogin.password)
			
			{
				// Borramos la contraseña del objeto usuario
				console.log(userToLogin);
				delete userToLogin.password;

				// Pasamos al usuario a session
				req.session.user = userToLogin;

				if (req.body.remember) {
					res.cookie('user', userToLogin.id, { maxAge: 180000});
				}

				// Redirección
				return res.redirect('index');
			} else {
				res.send('Datos incorrectos');
			}
		} else {
			res.send('El usuario no existe');
		}
	},

	index: (req, res) => {
		res.render('index', {
			user: req.session.user
		});
	},
	logout: (req, res) => {
		// Destruimos la session
		req.session.destroy();
		// Pisar la cookie
		res.cookie('user', null, { maxAge: -1 });
		// Redirección
		return res.redirect('/login');
	}
};

module.exports = loginController
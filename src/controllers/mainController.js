const fs = require('fs');
const path = require('path');
const helperFunctions = require('../functions/helpers');
const { validationResult } = require('express-validator'); 
let productsData = helperFunctions.getAll('todos');
 

const controller = {
	root: (req, res) => {
		console.log("hola");
		res.render('index',{'productos':productsData});
	},
	carrito: (req, res) => {
		res.render('Carrito');
	},
	metodoDePago:(req, res) => {
		res.render('MetodoPago');
	},
	login:(req, res) => {
		res.render('login');
	},
	registro:(req, res) => {
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
	//	req.body.foto = req.file.filename;
		// Guardar el producto y como la función retorna la data lo almacenamos en ela variable "product"

		 	// Hasheo la contraseña
	//req.body.user_password = bcrypt.hashSync(req.body.user_password, 11);
	// Genero la data del usuario
	let newUserData = {
		id: helperFunctions.generateUserId(),
		avatar: req.file.filename,
		...req.body
	}
	// Guardo al usuario en el JSON
	helperFunctions.storeUser(newUserData);
	// Redirección
    return res.send('<h1>Ok, pasó las validaciones</h1>');
	
}
},

processLogin: (req, res) => {
	// Busco al usuario por email
	let userToLogin = helperFunctions.getUserByEmail(req.body.email);

	// Valido si existe el usuario
	if(userToLogin != undefined) {
		// Magia	if (bcrypt.compareSync(req.body.user_password, userToLogin.user_password))
		if (userToLogin.password == userToLogin.password)
		
		{
			// Borramos la contraseña del objeto usuario
			delete userToLogin.password;
			console.log(userToLogin);
			// Pasamos al usuario a session
			req.session.user = userToLogin;
		 

			if (req.body.remember) {
				res.cookie('user', userToLogin.id, { maxAge: 180000});
			}

			// Redirección
			return res.redirect('profile');
		} else {
			console.log(userToLogin);
			res.send( "error" );
		}
	} else {
		res.send('El usuario no existe');
	}
},

profile: (req, res) => {
	res.render('profile', {
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


 
module.exports = controller

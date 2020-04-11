const db = require('../database/models/');
const Users = db.users;
 
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); 
const helperFunctions = require('../functions/helpers');
const bcrypt = require('bcrypt');

const userController = {
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
			// Hash del password
		req.body.password = bcrypt.hashSync(req.body.password, 10);

		// Eliminar la propiedad re_password
		delete req.body.re_password;

		// Asignar el nombre final de la imagen
		req.body.avatar = req.file.filename;

		// Guardar al usario y como la función retorna la data del usuario lo almacenamos en ela variable "user"
		//let user = helperFunctions.storeUser(req.body);

		Users
		.create(req.body)
		.then(users => {
		console.log("crear user");
			// Setear en session el ID del usuario nuevo para auto loguearlo
			req.session.userId = users.id;
	
			// Setear la cookie para mantener al usuario logueado
			res.cookie('userCookie', users.id, { maxAge: 60000 * 60 });
	
			// Redirección al profile
			 return res.redirect('/user/todosUserAdmin');;
		 
		})
		.catch(error => res.send(error));
      
		}
		
		
	},



	processLogin: (req, res) => {
	 
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
	        return res.render('login', {
				errors: errorsResult.array(),
				hasErrorGetMessage,
				oldData: req.body }); 
			  
			
		} else {
		Users

		
		.findAll(
	       {
			   where: {
				   email: req.body.email,
			   }
		   }
		)
		.then(users => {
			// Valido si existe el usuario
			console.log(req.body);
		if(users.id !== null) {
		
			 
				 return res.render('userProfile', { 
					title: 'users  List',
					'users' : users 
				}); 
		 
	
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
		
			})

			.catch(error => res.send(' Error')); 
		}
		} ,
	 

	
	  
	profile: (req, res) => {
		Users
		.findAll(
	       {
			   where: {
				   email: 'flor@gmail.com',
			   }
		   }
		)
		.then(users => {
			// Valido si existe el usuario
	 
		if(users.id !== null) {
		
			 
				 return res.render('userProfile', { 
					title: 'users  List',
					'users' : users 
				}); 
		 
	
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
		
			})

			.catch(error => res.send(' Error')); 
	 
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
		res.cookie('userCookie', null, { maxAge: -1 });
		// Redirección
		return res.redirect('/user/profile');
	},

	ListarAdm: (req, res) => {	//res.render('todosAdmin',{'productos':productsData});
	Users
		.findAll()
		.then(users => {
			
			return res.render('todosUserAdmin', { 
				title: 'users  List',
				'users' : users 
			});
		})
		.catch(error => res.send(error));
 
	},


	destroy: (req, res) => {
		Users
			.findByPk(req.params.id, {
			 
			})
			.then(users => {
				 
				users.destroy();
				return res.redirect('/user/todosUserAdmin');
			})
			.catch(error => res.send(error));
	},


	edit: (req, res) => {
		Users
			.findByPk(req.params.id, {
			 
			})
			.then(user => {
				return res.render('editUser', { 
					title: 'users  List',
					'user' : user
				});
				 
			 
			})
			.catch(error => res.send(error));
	},
update:(req, res) => {
	Users
		.update(req.body,
			{

                where:{ id: req.params.id}

			}
			
			)
		.then(users => {
 
	
			// Redirección al profile
			 return res.redirect('/user/todosUserAdmin');;
		 
		}
		
		
		)
		.catch(error => res.send(error));
      
		}
		
};

module.exports = userController
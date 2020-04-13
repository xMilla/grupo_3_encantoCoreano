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
				console.log(req.body.email)
				// Si encontramos al usuario
				if (users != undefined) {
                  let user  = users[0];
					// Al ya tener al usuario, comparamos las contraseñas
					if (bcrypt.compareSync(req.body.password, user.password)) {
						// Setear en session el ID del usuario
						console.log('Credenciales válidas' )		
						req.session.userId = user.id;
						req.session.avatar= user.avatar;
						// Setear la cookie
						if (req.body.remember_user) {
							res.cookie('userCookie', user.id, { maxAge: 60000 * 60 });
						}
						// Redireccionamos al visitante a su perfil	
						console.log(user )					
						return res.render('userProfile', { 
							title: 'users  List',
							'users' : users ,
							'avatar' : req.session.avatar
						}); 
						} else {
							res.send('Credenciales inválidas');
						}

						} else {
							res.send('No hay usuarios registrados con ese email');
						}
			  })
			 .catch(error => res.send(error));
		}
    } ,
	 
	
		profile: (req, res) => {
		 
			Users
			.findAll(
			   {
				   where: {
					   email: req.session.userId,
				   }
			   }
			)
			.then(users => {
				// Redireccionamos al visitante a su perfil						
						return res.render('userProfile', { 
							title: 'users  List',
							'users' : users ,
						    'avatar' : req.session.avatar
						}); 
						
			   })
			   .catch(error => res.send(error));
	
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
				'users' : users ,
				'avatar' : req.session.avatar
				

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
					'user' : user,
					'avatar' : req.session.avatar
				});
				 
			 
			})
			.catch(error => res.send(error));
	},
update:(req, res) => {

	const hasErrorGetMessage = (field, errors) => {
		for (let oneError of errors) {
			if (oneError.param == field) {
				return oneError.msg;
			}
		}
		return false;
	}
			
	let errorsResult = validationResult(req);
   let ruta = "/editUser/" +   req.params.id  ;
	if ( !errorsResult.isEmpty() ) {
		return res.render( 'editUser' ,  {
			errors: errorsResult.array(),
			hasErrorGetMessage,
			oldData: req.body,
			user : req.body,
			avatar : req.session.avatar
		});
	} else {
		// Hash del password
	req.body.password = bcrypt.hashSync(req.body.password, 10);

	// Eliminar la propiedad re_password
	delete req.body.re_password;

	// Asignar el nombre final de la imagen
	req.body.avatar = req.file.filename;
  
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
	}
};

module.exports = userController
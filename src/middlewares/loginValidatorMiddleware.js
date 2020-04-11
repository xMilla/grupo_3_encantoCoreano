const path = require('path');
const db = require('../database/models/');
const Users = db.users;

const { check } = require('express-validator');

module.exports = [


	// validando campo email
	//Obligatorio, Deberá ser válido y No puede repetirse con los emails ya registrados
 

	check('email')
	.notEmpty().withMessage('El email es obligatorio').bail()
	.isEmail().withMessage('Escribí un email válido').bail()
	.custom((value, { req }) => {
		return Users
		.findAll(
			{
				where: {
					email: value
				}
			}
		 )
		.then(user => {
			console.log(user.length);
			if (user.length == 0 ){
			   return Promise.reject("El mail no esta registrado");  
			}
		 }) 
}),
		

// Obligatoria
//Deberá tener al menos 8 caracteres
//(Opcional) → Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial
 
check('password')
.notEmpty().withMessage('Escribí una contraseña').bail()
	
	
	
];
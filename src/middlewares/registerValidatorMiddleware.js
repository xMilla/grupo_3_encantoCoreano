const path = require('path');
const db = require('../database/models/');
const Users = db.users;

const { check } = require('express-validator');

module.exports = [
	// validando campo nombre
	//Obligatorio y Deberá tener al menos 2 caracteres
	check('fullName')
	.notEmpty().withMessage('El nombre es obligatorio').bail()
	.isLength({min: 2}).withMessage( 'El nombre debe tener al menos dos caracteres'),
 

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
				if (user.length > 0 ){
				   return Promise.reject("El mail ya esta registrado");  
				}
			 }) 
	}),
			 
	 

// Obligatoria
//Deberá tener al menos 8 caracteres
//(Opcional) → Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial
	check('password')
		.notEmpty().withMessage('Escribí una contraseña').bail()
		.isLength({ min: 8 }).withMessage('La contraseña debe tener más de 5 letras'),
	
		// validando campo avatar
	check('avatar')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una imagen de perfil');
			} else if (req.file.originalname) {
				let fileExtension = path.extname(req.file.originalname);
				let extensionIsOk = acceptedExtensions.includes(fileExtension);
				if (!extensionIsOk) {
					throw new Error('Los formatos válidos son JPG, JPEG y PNG');
				}
			}
			return true;
		})
];
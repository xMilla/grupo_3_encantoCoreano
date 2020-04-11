const path = require('path');
 
const { check } = require('express-validator');

module.exports = [
	 
// Obligatorio
//Deberá tener al menos 5 caracteres
	check('nombre_product')
	.notEmpty().withMessage('El nombre es obligatorio').bail()
	.isLength({min: 10}).withMessage( 'El nombre debe tener al menos 10 caracteres'),
 

	//Descripción 
	//Deberá tener al menos 20 caracteres
	check('descripcion_larga')
	.notEmpty().withMessage('El nombre es obligatorio').bail()
	.isLength({min: 20}).withMessage( 'La descripcion debe tener al menos 20 caracteres'),
			 
	 
 
		// validando Deberá ser un archivo válido (JPG, JPEG, PNG, GIF)
	check('foto')
		.custom((value, { req }) => {
			let acceptedExtensions = ['.jpg', '.jpeg', '.png' , '.gif'];
			if (typeof req.file == 'undefined') {
				throw new Error('Elegí una foto para el producto');
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
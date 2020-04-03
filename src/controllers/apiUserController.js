const db = require('../database/models');
const Users = db.users;
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator'); 
const bcrypt = require('bcrypt');

const apiUserController = { 
	find: (req, res) => {
        // Busco al usuario por email	
        
		Users
		.findAll(
	       {
			   where: {
				   email: req.params.mail
			   }
		   }
		)
		.then(users => {
            // Valido si existe el usuario		 
            let respuesta = {
                meta: {
                   status:res.statusCode,
                   total: users.length,
                   mail: req.params.mail
              
                 },
                  data:users
                 };
              
              res.json(respuesta)
        })
        .catch(error => res.json(error));
    } 
};

module.exports = apiUserController
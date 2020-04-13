function guestMiddleware (req, res, next) {
	if (req.session.userId != undefined) {
		//return res.redirect('/user/profile');

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
	}
	next();
}

module.exports = guestMiddleware;
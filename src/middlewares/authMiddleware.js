function authMiddleware (req, res, next) {
	// Si existe algo en la prop user de session
	if(req.session.user != undefined) {
		return next();
	}
	return res.redirect('/index');
}

module.exports = authMiddleware;
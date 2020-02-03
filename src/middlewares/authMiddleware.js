function authMiddleware (req, res, next) {
	if (req.session.userId == undefined) {
		return res.redirect('/user/login');
	}
	next();
}

module.exports = authMiddleware;
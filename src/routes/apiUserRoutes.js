// ************ Require's ************
const express = require('express');
const router = express.Router();
const userApiController = require("../controllers/apiUserController");

router.get('/:mail', userApiController.find);

module.exports= router;
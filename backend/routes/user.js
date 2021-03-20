const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/:id', auth, userCtrl.findUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', auth, userCtrl.delete);

module.exports = router;
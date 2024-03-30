const { Router } = require ('express');

const router = Router();

router.post('auth/login', login);

module.exports = router;
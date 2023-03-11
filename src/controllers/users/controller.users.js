const { Router } = require('express')
const { UserManager } = require('../../dao/mongoClassManagers/userClass/userMongoManager');
const { createHash } = require('../../utils/cryptPassword');
const passport = require('passport');
const userMongo = new UserManager();


const router = Router()


router.post('/', passport.authenticate('register', { failureRedirect: '/user/failRegister' }), async (req, res) => {
  try {

    res.send({ message: 'Usuario registrado' });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
    res.status(500).json({ error: 'Internal server error' })
  }
});

router.get('/failRegister', async (req, res) => {
  console.log('Falló el registro');
  res.send({ error: 'Falló el registro' });
});

module.exports = router
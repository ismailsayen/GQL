const route = require('express').Router();
const pool = require("../db");
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwtGenerator = require('../utils/jwtGenerator')
const ValidInfo = require('../middleware/ValidInfo')
const authorization = require("../middleware/Auhtorization")
const cookie = require('cookie');
//------registerin-----------------
route.post('/register', authorization, ValidInfo, async (req, res) => {
  try {
    // Destructuring
    const { nom, prenom, email, password, numero_de_telephone, grade, sexe } = req.body;

    // Verifying role of admins
    console.log(req.body)
    console.log(req.role)
    if (req.role !== "admin") {
      return res.status(401).json("Vous n'êtes pas autorisé");
    }

    // Verifying if user exists in the database
    const user = await pool.query('SELECT * FROM utilisateur WHERE email=$1', [email]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // Hashing password
    const salt = await bcrypt.genSalt(saltRound);
    const hashPwd = await bcrypt.hash(password, salt);

    // Inserting data
    const new_user = await pool.query('INSERT INTO utilisateur (nom, prenom, email, password, numero_de_telephone, grade) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [nom, prenom, email, hashPwd, numero_de_telephone, grade, sexe]);
    res.status(200).json("ajouter avec success")

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//------------------------login-------------------------
// Route de login dans votre fichier backend

route.post('/login', ValidInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM utilisateur WHERE email=$1', [email]);

    if (user.rows.length === 0) {
      console.log('Invalid email');
      return res.status(401).json({ email: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ password: "Invalid password" });
    }

    const token = jwtGenerator(user.rows[0].id, user.rows[0].grade);
    const serialized = cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    return res.status(500).json({ error: "Server error" });
  }
});


//---verifying if is true
route.get('/verify', authorization, (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send("Not authorisad")
  }

})
// delete token 
route.post('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Token deleted successfully" });
  } catch (err) {
    console.error('Error during logout:', err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = route
const route = require('express').Router();
const Auhtorization = require('../middleware/Auhtorization')
const pool = require('../db')
const bcrypt = require('bcrypt')
const saltRound = 10;
//------------------
route.get('/', Auhtorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT id,nom, prenom, email,numero_de_telephone, grade FROM utilisateur WHERE id=$1', [req.user])
    res.json({ user: user.rows, role: req.role })

  } catch (err) {
    console.error('SERVER ERREUR')
    res.status(401).send('NOT AUTHORISAT')
  }
})
route.put('/modify', Auhtorization, async (req, res) => {
  try {
    const { password, newPassword, confirmationNewPassword } = req.body;

    const user = await pool.query('SELECT * FROM utilisateur WHERE id=$1', [req.user]);
    const comparePassword = await bcrypt.compare(password, user.rows[0].password);

    if (!comparePassword) {
      return res.status(401).json('Ancien mot de passe est incorrect');
    }

    if (newPassword === confirmationNewPassword) {
      const salt = await bcrypt.genSalt(saltRound);
      const hashPwd = await bcrypt.hash(newPassword, salt);
      const MaJ = await pool.query('UPDATE utilisateur SET password=$1 WHERE id=$2', [hashPwd, req.user]);
      return res.status(200).json('Mot de passe modifié avec succès');
    } else {
      return res.status(401).json('Les deux mots de passe ne sont pas identiques');
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Internal Server Error');
  }
});

// modifier le role d'un admin ou sous-admin
  route.put('/roleEditing/:id', Auhtorization,async (req, res) => {
    try {
      if (req.role !== 'admin') {
        res.status(403).send('Not authorized');
      } 
      const { id } = req.params
      const {newRole} = req.body
      const user = await pool.query('UPDATE utilisateur SET grade=$1 WHERE id=$2', [newRole, id])
      res.status(200).json('Role updated successfully');
    } catch (err) {
      console.error(err.message)
      res.status(401).send('Sever Error')
    }
  })
// supprimer un utilisateur
route.delete('/delete/:id', Auhtorization, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est autorisé à effectuer cette action
    if (req.role !== 'admin') {
      return res.status(403).send('Non autorisé');
    } 

    const { id } = req.params;
    console.log(id)
    // Supprimer l'utilisateur de la base de données en utilisant son ID
    const deleteUser = await pool.query('DELETE FROM utilisateur WHERE id = $1', [id]);

    // Vérifier si l'utilisateur a été supprimé avec succès
    if (deleteUser.rowCount === 1) {
      return res.status(200).json('Utilisateur supprimé avec succès');
    } else {
      return res.status(404).json('Utilisateur non trouvé');
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Erreur interne du serveur');
  }
});

module.exports = route


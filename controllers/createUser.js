import xss from 'xss';
import { v4 } from 'uuid';
import query from '../database.js';
import bcrypt from 'bcrypt';

export default (req, res) => {
  // On encrypte le mot de passe
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    // On vérifie s'il y a une erreur lors de l'encryptage du mot de passe
    if (error) {
        console.error(error);
        res.status(500).json({
          error: 'Erreur serveur'
        });
        return;
    }
    // On créer le nouveau user
    const user = {
      id: v4(),
      pseudo: xss(req.body.pseudo),
      password: hash,
      role: 'admin'
    };
    // On insère le nouveau user dans la BDD
    query(
      'INSERT INTO User (id, pseudo, password, role) VALUES(?, ?, ?, ?)',
      [user.id, user.pseudo, user.password, user.role],
      (error, result) => {
        // On vérifie s'il y a une erreur lors l'exécution de la requête
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        //On répond au client avec l'id du user créé
        res.status(201).json({
          data: {
            id: user.id
          }
        });
      }
    );
  });
};
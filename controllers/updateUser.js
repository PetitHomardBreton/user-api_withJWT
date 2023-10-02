import xss from 'xss';
import query from '../database.js';

export default (req, res) => {
  // !!! IMPORTANT : pour des raisons de sécurité,
  // on ne retourne jamais les mots de passe au client !!!
  const id = req.params.id;

  // On récupère le user à modifier depuis la BDD
  query(
    'SELECT id, role FROM User WHERE id = ?', [id],
    (error, results) => {
      // On vérifie s'il y a une erreur lors l'exécution de la requête
      if (error) {
        console.error(error);
        res.status(500).json({
          error: 'Erreur serveur'
        });
        return;
      }

      // Si le user n'a pas été trouvé, on répond not found au client
      if (results.length === 0) {
        return res.status(404).send({
          error: `L'utilisateur avec l'id ${id} n' pas été trouvé`
        });
      }

      // On créé le user à modifier, qui sera retourné au client
      const userToUpdate = {
        id,
        pseudo: xss(req.body.pseudo),
        role: results[0].role
      }

      // On met à jour le user dans la BDD
      query(
        'UPDATE User SET pseudo = ? WHERE id = ?', [userToUpdate.pseudo, id],
        (error) => {
          // On vérifie s'il y a une erreur lors l'exécution de la requête
          if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
          }

          //On répond au client avec le user modifié
          res.status(201).json({
            data: userToUpdate
          });
        }
      );
    }
  );
};

import query from '../database.js';

export default (req, res) => {
  const id = req.params.id;

  // !!! IMPORTANT : pour des raisons de sécurité,
  // on ne retourne jamais les mots de passe !!!
  query(
    'SELECT id, pseudo, role FROM User WHERE id = ?',
    [id],
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

      // On répond au client avec le user récupéré
      res.json({
        data: results[0]
      });
    }
  );
};

import query from '../database.js';

export default (req, res) => {
  const id = req.params.id;

  query(
    'DELETE FROM User WHERE id = ?',
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

      // On répond au client avec l'id du user supprimé
      res.json({
        data: {
          id
        }
      });
    }
  );
};

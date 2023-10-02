import query from '../database.js';

export default (req, res) => {
  // !!! IMPORTANT : pour des raisons de sécurité,
  // on ne retourne jamais les mots de passe !!!
  query(
      'SELECT id, pseudo, role FROM User',
      [],
      (error, results) => {
        // On vérifie s'il y a une erreur lors l'exécution de la requête
        if (error) {
            console.error(error);
            res.status(500).json({
              error: 'Erreur serveur'
            });
            return;
        }
        //On répond au client avec la liste des users récupérés
        res.json({
          data: results
        });
      }
    );
};

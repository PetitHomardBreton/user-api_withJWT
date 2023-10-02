import query from '../database.js';
import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';

export default (req, res) => {
    const {pseudo, password} = req.body;

    // Récupération du User par son pseudo
    query(
        'SELECT * FROM User WHERE pseudo = ?',
        [pseudo],
        (error, results) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors l'exécution de la requête : ${error}`);
                res.status(500).json({
                  error: 'Erreur serveur'
                });
                return;
            }
            
            // Si le user n'a pas été trouvé, on répond au client
            if (results.length === 0) {
                return res.status(400).send({
                  error: `Identifiants incorrects`
                });
            }

            // Vérification du mot de passe
            bcrypt.compare(password, results[0].password, (error, isAllowed) => {
                if(isAllowed) {
                    // Génération du token
                    const user = {
                        id: results[0].id,
                        pseudo: results[0].pseudo,
                        role: results[0].role
                    };
                    const token = Jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.setHeader('Authorization', `Bearer ${token}`);
                    return res.send({
                        data: user
                    });
                }
                return res.status(400).send({
                  error: `Identifiants incorrects`
                });
            });
        }
    );
}
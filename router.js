import express from "express";

const router = express.Router();

import createUser from "./controllers/createUser.js";
import listUsers from "./controllers/listUsers.js";
import getUser from "./controllers/getUser.js";
import updateUser from "./controllers/updateUser.js";
import deleteUser from "./controllers/deleteUser.js";
import login from "./controllers/login.js";

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
    /* token= 'Bearer xxxx' */
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Authentication failed: Invalid token' });
        }
        
        req.user = user;
        
        next();
    })
}

router.post('/users', createUser);
router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/login', login);

export default router;

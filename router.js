import express from "express";

const router = express.Router();

import createUser from "./controllers/createUser.js";
import listUsers from "./controllers/listUsers.js";
import getUser from "./controllers/getUser.js";
import updateUser from "./controllers/updateUser.js";
import deleteUser from "./controllers/deleteUser.js";

router.post('/users', createUser);
router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;

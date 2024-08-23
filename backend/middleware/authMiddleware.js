import jwt from 'jsonwebtoken'
import UserModel from '../models/Users.js';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');
        req.user = await UserModel.findById(decoded.id);
        next();
    });
};

export  {verifyToken}
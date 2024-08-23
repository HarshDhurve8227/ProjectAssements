// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authcontroller.js';
import upload from '../middleware/multer.js'; // Import multer middleware
import { authenticate } from '../middleware/authenticate.js';
import UserModel from '../models/Users.js'; // Import UserModel


const router = express.Router();



router.post('/register', upload.single('profileImage'), register);


router.post('/login', login);


router.get('/user', authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;

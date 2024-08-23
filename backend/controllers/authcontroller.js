import UserModel from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { email, password } = req.body;
    const profileImage = req.file ? req.file.filename : ''; // Get the filename from multer

    console.log('Register request received:', { email, password, profileImage }); // Debugging

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword, profileImage });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error); // Debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        res.json({ token, user: { email: user.email, profileImage: user.profileImage } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { register, login };

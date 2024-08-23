
import express from 'express'
import  connectDB  from './config/database.js';
import dotenv from 'dotenv'
import cors from 'cors'
import authrouter from './routes/Authroutes.js';
import blogrouter from './routes/BlogRoutes.js';







dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authrouter);
app.use('/api/blogs',blogrouter);

const PORT = process.env.PORT || 8000;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


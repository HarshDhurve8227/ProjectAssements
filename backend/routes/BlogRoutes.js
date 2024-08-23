import express from 'express'
const blogrouter = express.Router();
import { createBlog,getBlogs,updateBlog,deleteBlog,addComment } from '../controllers/blogcontroller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

blogrouter.post('/', verifyToken, createBlog);
blogrouter.get('/', getBlogs);
blogrouter.put('/:id', verifyToken, updateBlog);
blogrouter.delete('/:id', verifyToken, deleteBlog);
blogrouter.post('/:blogId/comments', verifyToken, addComment);

export default blogrouter
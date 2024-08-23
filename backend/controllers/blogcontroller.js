import BlogModel from "../models/Blog.js";

 const createBlog = async (req, res) => {
    const { title, image, description } = req.body;
    try {
        const blog = new BlogModel({ title, image, description, authorId: req.user.id });
        await blog.save();
           res.status(201).json(blog);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   };

  const getBlogs = async (req, res) => {
       try {
           const blogs = await BlogModel.find().populate('authorId', 'email');
           res.json(blogs);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   };

   const updateBlog = async (req, res) => {
       const { id } = req.params;
       const updates = req.body;
       try {
           const blog = await BlogModel.findByIdAndUpdate(id, updates, { new: true });
           res.json(blog);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   };

   const deleteBlog = async (req, res) => {
       const { id } = req.params;
       try {
           await BlogModel.findByIdAndDelete(id);
           res.json({ message: 'Blog deleted' });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   };

   const addComment = async (req, res) => {
       const { blogId } = req.params;
       const { content } = req.body;
       try {
           const blog = await BlogModel.findById(blogId);
           blog.comments.push({ userId: req.user.id, content });
           await blog.save();
           res.status(201).json(blog);
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   };

   export {createBlog,getBlogs,updateBlog,deleteBlog,addComment}
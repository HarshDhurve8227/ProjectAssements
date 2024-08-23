import mongoose from "mongoose";

   const commentSchema = new mongoose.Schema({
       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
       content: String,
       replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
   });

   const blogSchema = new mongoose.Schema({
       title: { type: String, required: true },
       image: { type: String, required: true },
       description: { type: String, required: true },
       comments: [commentSchema],
       authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   });

   const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel;


   
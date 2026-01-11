
import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import { create } from 'domain';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) =>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
       
        console.log(req.body);
        const imageFile = req.file;
        console.log("req.file contaion:");
        console.log(req.file);

        // check if all fields are present

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        //upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimization through imagekit URL transformation

        const optimizedImageUrl = imagekit.url({
            path: response.filePath, 
            transformation: [
                {quality: 'auto'},// Auto compression
                {format: 'webp'},// convert to modern format
                {width: '1280'}  // width resizing
            ]

        });

        const image = optimizedImageUrl;

        // save the data into mongo DB . for this we use the .create method

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success:true, message:"Blog added successfully"})

       
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getAllBlogs = async (req, res) =>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true, blogs})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getBlogById = async (req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.json({success:false, message:"Blog not found"})
        }

        res.json({success:true, blog})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const deleteBlogById = async(req, res) =>{
    try {

        /* const {id} = req.body;

        // 1. Check if ID was even sent
        if (!id) {
            return res.json({success: false, message: "Blog ID is required"});
        }

        // 2. Perform the delete and CAPTURE the result
        const deletedBlog = await Blog.findByIdAndDelete(id);

        // 3. Check if anything was actually found and deleted
        if (!deletedBlog) {
            return res.json({success: false, message: "Blog not found"});
        }

        res.json({success:true, message:"Blog deleted successfully"}); */


        const {id} = req.body;
        await Blog.findByIdAndDelete(id);

        // Delete the commnets associated with the blog

        await Comment.deleteMany({blog: id});
        res.json({success:true, message:"Blog deleted successfully"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const togglePublish = async (req,res) =>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = ! blog.isPublished;
        await blog.save();
        res.json({success:true, message: "Blog status updated"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});  // Here we set the data in the database that we got from the user and bydefault isApproved is false
        res.json({success:true, message:'Comment added for review'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}




// controller to get comment data for the individual blog
export const getBlogComments = async (req, res) =>{
    try {
        const {blogId} = req.body;

        const comments = await Comment.find({blog:blogId, isApproved: true}).sort({createdAt:-1});
        res.json({success:true, comments})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


export const generateContent = async (req, res) =>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format.')
        res.json({success:true, content})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
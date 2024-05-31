import postModel from "./post.model.js";

export const createPost = async (req, res) => {
    const { uid } = req.user; 

    try{
        const { idCommunity, title, content, anonymous, category, file} = req.body; 
        const post = await postModel.create({
            idUser: uid, 
            idCommunity,
            title, 
            content, 
            anonymous, 
            category,
            file
        });
        res.status(201).json({ post });
    }catch(error){
        res.status(500).send(`Error creating post: ${error.message}`);
    }

};

export const getPost = async (req, res) => {
    try{
        const post = await postModel.find({status: true});
        res.status(200).json(post);
    }catch(error){
        res.status(500).send(`Error list post ${error}`);
    }
}

export const deletePost = async (req, res) => {
    const { idPost } = req.params;
    try{
        const post = await postModel.findByIdAndUpdate(idPost, { status: true}, { new: true});
        res.status(200).json(post);
    }catch(error){
        res.status(500).send(`Error eliminated post ${error}`);
    }
}
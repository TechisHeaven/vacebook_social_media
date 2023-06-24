const Posts = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  const { PostUserID, PostUserName, PostUserImg, PostHeading } = req.body;
  let postImg = req.file;

  if (
    !PostUserID ||
    !PostUserName ||
    !PostUserImg ||
    !PostHeading ||
    !postImg
  ) {
    res.status(400).send({ message: "Please fill all Credentials" });
  }

  let profile = req.file ? req.file.filename : null;
  postImg = profile;

  const Post = await Posts.create({
    PostUserID,
    PostUserName,
    PostUserImg,
    PostHeading,
    postImg,
  });
  let imageFolder = "http://localhost:3000/public/images/";
  if (Post) {
    res.status(201).json({
      _id: Post._id,
      PostUserID: Post.PostUserID,
      PostUserName: Post.PostUserName,
      PostUserImg: Post.PostUserImg,
      PostHeading: Post.PostHeading,
      postImg: Post.postImg,
      PostLikes: Post.PostLikes,
      PostComments: Post.PostComments,
      PostShare: Post.PostShare,
    });
  } else {
    res.status(404).send({ message: "Failed to create Post" });
    // res.status(404);
    // throw Error("Failed to Create User");
  }
};

//update posts
const updatePost = async (req, res) => {
  let Post_id = req.query.post_id;
  let option = req.query.option;
  let user_id = req.query.id;

  if (!Post_id || !option || !user_id) {
    res.status(404).send({ message: "not allowed to update post" });
    return;
  }

  // like controller
  if (option === "like") {
    const checkUser = await Posts.find({
      _id: Post_id,
      PostLikes: { $elemMatch: { user_Id: user_id } },
    });

    if (checkUser.length > 0) {
      const Post = await Posts.updateOne(
        { _id: Post_id },
        { $pull: { PostLikes: { user_Id: user_id } } }
      );

      // Fetch the updated post data
      const page = parseInt(req.query.page) || 0;
      const limit = 2;

      const updatedPost = await Posts.find({ _id: Post_id })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit);

      res.status(201).send(updatedPost);
      return;
    }

    const Post = await Posts.updateOne(
      { _id: Post_id },
      { $push: { PostLikes: { user_Id: user_id } } }
    );

    if (Post) {
      // Fetch the updated post data
      const page = parseInt(req.query.page) || 0;
      const limit = 2;

      const updatedPost = await Posts.find({ _id: Post_id })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit);

      res.status(201).json(updatedPost);
    } else {
      res.status(404).send({ message: "Failed to get post" });
    }
  }

  //post comment controller

  if (option === "comment") {

    let checkPost = Posts.findOne({ _id: Post_id });

    if (!checkPost) {
      return res.status(404).send({ message: "Post Does Not Exist" });
    }
    let comment = req.body.comment;

    let userData = await User.findOne(
      { _id: user_id },
      "-password -email -dob -gender -createdAt -updatedAt -friends"
    );

    const result = await Posts.updateOne(
      { _id: Post_id },
      { $push: { PostComments: {
         user_id: user_id,
         user_name: userData.name,
         user_pic: userData.pic, 
         comment: comment,
        } } }
    );

    if (result) {
      let postData = await Posts.findOne({ _id: Post_id });

      res.status(200).send(postData);
    }
  }

  //postedit controller
  if (option === "postEdit") {
    let { heading } = req.body;
    let postImg = req.file;

    const data = await Posts.findOne({ _id: Post_id });

    if (!data) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (data.PostUserID !== user_id) {
      return res.status(401).send({ message: "Invalid post user" });
    }

    let result = await Posts.updateOne(
      { _id: Post_id },
      { $set: { PostHeading: heading, postImg: postImg } }
    );

    if (result) {
      let postData = await Posts.findOne({ _id: Post_id });
      res.status(200).send(postData);
    } else {
      res.status(404).send({ message: "Failed to get post" });
    }
  }
};

//get only user post
const userpost = async (req, res) => {
  const page = parseInt(req.params.page) || 0;
  const limit = 2;
  const _id = req.params.id;

  const Post = await Posts.find({ PostUserID: _id })
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);

  if (Post) {
    res.status(201).json(Post);
  } else {
    res.status(404).send({ message: "Failed to get post" });
  }
};

const specificPosts = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(404).send({ message: "Id not found", status: 404 });
  }
  
  if (id.length > 24) {
    return res.status(400).json({ message: "Invalid ID length", status: 400 });
  }
 

  const Post = await Posts.findOne({ _id: id });

  if (Post) {
    res.status(200).json(Post);
  } else {
    res.status(404).json({ message: "Post not found", status: 404 });
  }
};

const allPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 2;

  const Post = await Posts.find({})
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit);

  if (Post) {
    res.status(201).json(Post);
  } else {
    res.status(404).send({ message: "Failed to get post" });
  }
};

module.exports = { createPost, allPosts, userpost, updatePost, specificPosts };

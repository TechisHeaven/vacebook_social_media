const generateToken = require("../config/generateToken");
const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");
//register user
const registerUser = async (req, res) => {
  const { name, email, password, dob, gender } = req.body.data;

  if (!name || !email || !password || !dob || !gender) {
    res.status(400).send({ message: "Please fill all Credentials" });
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, dob, gender });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).send({ message: "Failed to create user" });
    // res.status(404);
    // throw Error("Failed to Create User");
  }
};

// login auth user
const authUser = async (req, res) => {
  // const { email, password } = req.body;
  let email = req.body.data.email;
  let password = req.body.data.password;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    delete user.password;
    delete user._id;

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      dob: user.dob,
      gender: user.gender,
      friends: user.friends,
      token: generateToken(user._id),
    });
  } else {
    res
      .status(401)
      .send({ message: "Invalid password or email test", status: 401 });
  }
};

// update user
const updateUser = async (req, res) => {
  // const {_id, name, email, password, dob , gender } = req.body.data;
  const { _id, name, email, password, dob, gender } = req.body;
  let pic = req.file;
  const type = req.params.type;

  let profile = req.file ? req.file.filename : null;
  pic = profile;

  let UpdateUserRes;

  if (type == "name") {
    UpdateUserRes = await User.updateOne(
      { _id: _id },
      { $set: { name: name } }
    );

    if (UpdateUserRes) {
      res.status(201).json({ message: "success", UpdateUserRes });
    } else {
      res.status(404).send({ message: "Failed to Update user" });
    }
  }
  if (type == "pic") {
    UpdateUserRes = await User.updateOne({ _id: _id }, { $set: { pic: pic } });

    if (UpdateUserRes) {
      res
        .status(201)
        .json({ message: "success saved user profile", UpdateUserRes });
    } else {
      res.status(404).send({ message: "Failed to Update user porfile" });
    }
  }
  if (type == "profile") {
    UpdateUserRes = await User.updateOne(
      { _id: _id },
      { $set: { name: name, email: email, gender: gender } }
    );
    if (UpdateUserRes) {
      let user = await User.findOne({ _id: _id });
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "Failed to Update user" });
    }
  }
};

//fetch users
const fetchUser = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(404).send({ message: "Error Occured" });
  }
  if (id.length > 24) {
    return res.status(400).json({ message: "Invalid ID length", status: 400 });
  }

  let user = await User.findOne({ _id: req.params.id });
  if (user) {
    res.send({ message: "success", user });
  }
};

//add friend
const addFriend = async (req, res) => {
  // get ids from user
  const main_user_id = req.body.mainUser._id;
  const user_id = req.body.user._id;

  //check user id length
  if (
    main_user_id.length > 24 ||
    user_id.length > 24 ||
    main_user_id.length < 24 ||
    user_id.length < 24
  ) {
    return res.status(404).send({ message: "Invalid user id" });
  }

  // add users to friendsRequests database and check if accepted then add to user friends

  const doesBothIDsExist = await FriendRequest.findOne({
    $and: [
      { $or: [{ sender: main_user_id }, { receiver: main_user_id }] },
      { $or: [{ sender: user_id }, { receiver: user_id }] },
    ],
  });

  if (doesBothIDsExist?.status === "pending") {
    return res.status(409).send({ message: "Friend Request Already Exists" });
  }

  const result = await FriendRequest.create({
    sender: main_user_id,
    receiver: user_id,
  });

  if (result) {
    let data = await User.findOne({ _id: main_user_id });

    return res.status(200).send(data);
  }
};

//!removefriend
const removefriend = async (req, res) => {
  const main_user_id = req.body.mainUser._id;
  const user_id = req.body.user.user_id;

  // Remove user from the main_user's friends list
  const removeUserFromMainUser = await User.findOneAndUpdate(
    { _id: main_user_id },
    { $pull: { friends: { user_id: user_id } } }
  );

  // Remove main_user from the user's friends list
  const removeMainUserFromUser = await User.findOneAndUpdate(
    { _id: user_id },
    { $pull: { friends: { user_id: main_user_id } } }
  );

  if (removeUserFromMainUser && removeMainUserFromUser) {
    let result = await User.findOne({ _id: main_user_id });
    return res.status(200).send(result);
  } else {
    return res.status(404).send({ message: "Friend Doesn't not exists" });
  }

  // if(checkdoesExists.friends)
};

// friendRequestsUpdate
const friendRequestsUpdate = async (req, res) => {
  const main_user_id = req.body.mainUser._id;
  const mainUser_name = req.body.mainUser.name;
  const mainUser_pic = req.body.mainUser.pic;
  const user_id = req.body.user._id;
  const user_name = req.body.user.name;
  const user_pic = req.body.user.pic;
  const status = req.body.status;

  //check user id length
  if (
    main_user_id.length > 24 ||
    user_id.length > 24 ||
    main_user_id.length < 24 ||
    user_id.length < 24
  ) {
    return res.status(404).send({ message: "Invalid user id" });
  }
  if (status === "rejected") {
    return await FriendRequest.deleteOne({
      sender: user_id,
      receiver: main_user_id,
    });
  }

  if (status === "accepted") {
    // check user does exist or not in friend list
    const checkUser = await User.find({
      _id: main_user_id,
      // _id: user,
      friends: { $elemMatch: { user_id: user_id } },
    });

    if (checkUser.length > 0) {
      return res
        .status(401)
        .send({ message: "user already added in friend list" });
    }

    // Add user_id to main_user_id's friends list
    let result = await FriendRequest.updateOne(
      { sender: user_id, receiver: main_user_id },
      {
        $set: { status: "accepted" },
      }
    );

    const data = await User.updateOne(
      { _id: main_user_id },
      {
        $push: {
          friends: {
            user_id: user_id,
            user_name: user_name,
            user_pic: user_pic,
          },
        },
      }
    );

    const result2 = await User.updateOne(
      { _id: user_id },
      {
        $push: {
          friends: {
            user_id: main_user_id,
            user_name: mainUser_name,
            user_pic: mainUser_pic,
          },
        },
      }
    );

    if (data) {
      const userData = await User.findOne({ _id: main_user_id });

      await FriendRequest.deleteOne({
        sender: user_id,
        receiver: main_user_id,
      });

      return res.status(200).send(userData);
    }
  }
};

// get friendrequests

const friendrequests = async (req, res) => {
  let user_id = req.body._id;

  //check user id length
  if (user_id.length > 24 || user_id.length < 24) {
    return res.status(404).send({ message: "Invalid user id" });
  }

  let result = await FriendRequest.find({ receiver: user_id });

  let senderIds = result.map((request) => request.sender);
  let users = await User.find(
    { _id: { $in: senderIds } },
    "-password -gender -friends -email -dob -createdAt -updatedAt"
  );

  if (users) {
    return res.status(200).send(users);
  }
};

// find users
const findusers = async (req, res) => {
  let userIds = req.body.data;
  let result = await User.find({ _id: { $in: userIds } });
  if (result) {
    return res.status(200).send(result);
  }
};

// /api/user?search=himanshu

const searchallUsers = async (req, res) => {
  if (!req.params.search) {
    return res.status(404).send({ message: "Invalid User" });
  }
  const keyword = req.params.search
    ? {
        $or: [
          { name: { $regex: `^${req.params.search}`, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //   const users = await User.find(keyword);
  const users = await User.find(keyword).find({
    _id: { $ne: req.query.user._id },
  });
  res.send(users);
};

module.exports = {
  registerUser,
  authUser,
  searchallUsers,
  updateUser,
  fetchUser,
  addFriend,
  findusers,
  friendrequests,
  friendRequestsUpdate,
  removefriend,
};

const express = require("express");
const { registerUser, authUser , searchallUsers, updateUser,fetchUser, addFriend,removefriend, findusers, friendrequests, friendRequestsUpdate } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router()
const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/user/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage });

//*login user route
router.route("/login").post(authUser)
//*register user route
router.route('/').post(registerUser)
//?fetch user by id route
router.route('/:id').get(fetchUser)
//?search user route
router.route("/search/:search").get(searchallUsers);
//?update user route
router.route("/update/:type").put(upload.single("pic"),updateUser)
//*add friend route
router.route("/addfriend").put(addFriend)
//! remove friend route
router.route("/removefriend").put(removefriend)
//fetch friend request route
router.route("/friendrequests").post(friendrequests)
//*friend request update route
router.route("/friendrequests").put(friendRequestsUpdate)
//*find user route by id from frontend body
router.route("/findusers").post(findusers)



module.exports = router;
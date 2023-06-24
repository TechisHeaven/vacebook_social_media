const express = require("express");
const { registerUser, authUser , searchallUsers, updateUser,fetchUser, addFriend, findusers } = require("../controllers/userController");
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



router.route('/').post(registerUser)
router.route('/:id').get(fetchUser)
router.route("/search/:search").get(searchallUsers);
router.route("/login").post(authUser)
router.route("/update/:type").put(upload.single("pic"),updateUser)
router.route("/addfriend").put(addFriend)
router.route("/findusers").post(findusers)



module.exports = router;
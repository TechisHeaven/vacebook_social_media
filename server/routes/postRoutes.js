const express = require("express");
const { allPosts, createPost,userpost, updatePost, specificPosts, deletePost } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");
const path = require("path")
const router = express.Router();
const multer = require("multer");
const errorHandler = require("../config/errorHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage });



//?error handler  
router.use(errorHandler);



router.route("/").get(allPosts);
router.route("/:id").get(protect, specificPosts);
router.route("/userpost/:id/:page").get(userpost);
router.route("/create").post(upload.single("postImg"), createPost);
router.route("/update").put(updatePost);
router.route("/delete").put(deletePost);

module.exports = router;

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
const port = 3000;
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./config/errorHandler");
dotenv.config()
ConnectDB();

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname));




app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
ConnectDB();

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname));


app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

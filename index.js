const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS Policy
app.use(cors());

//Database Connection
connectDb(DATABASE_URL);

//JSON
app.use(express.json());

//Load Routes
app.use("/api/user", userRoutes);

// app.get("/api", (req, res) => {
//   res.send("Just sent a response");
// });

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

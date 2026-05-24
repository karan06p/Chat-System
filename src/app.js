const express = require("express");
const cookieParse = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParse());
app.use(authMiddleware);
app.use((err, req, res, next) => {          // Error Handler
  res.status(400).send(err.message);
});


app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
})


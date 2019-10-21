const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./config/db");


// Connect to database
connectDb();

// Defining our routes
const indexRoutes = require("./routes/index");
const urlRoutes = require("./routes/url");



app.use(express.json({ extended: false }))
app.use("/", indexRoutes);
app.use("/api/url", urlRoutes);


app.listen(port, () => console.log(`server started on port ${port}`));
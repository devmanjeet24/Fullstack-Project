import express from "express";
// import { connectDB } from "./config/db";


const app = express();

//Routes

// HTTP methods

app.get("/", (req, res) => {
    res.send("hello");
});



export default app; 
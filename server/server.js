import express from "express";
import { PORT, mongoDBURL } from "./configure.js";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/users.js";
import quizRoutes from './routes/quizzes.js';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware config
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
app.use(bodyParser.json({ limit: '20mb' }));

// Routes
app.use('', userRoutes);
app.use('', quizRoutes); 

mongoose.
    connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

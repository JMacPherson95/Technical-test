/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const { JWT_SECRET } = process.env;

app.use(cookieParser());
app.use(express.json());

function verifyToken(req, res, next) {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in to view this page.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

function logout(req, res) {
    res.clearCookie('jwtToken'); // Clears the jwtToken cookie
    res.status(200).json({ message: 'Logged out successfully.' });
}


module.exports = { verifyToken, logout };

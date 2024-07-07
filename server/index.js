require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("./models/User.js");
const { verifyToken, logout } = require("./helpers/auth.js");


const { MONGODB_URI, PORT, JWT_SECRET } = process.env;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
const saltRounds = 10;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/login", async (req, res) => {

  const { email, password } = req.body;
  console.log(`Received email: ${email}, password: ${password}`);

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({ message: 'User does not exist' })
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' })
      return;
    }

    const token = jwt.sign({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    },
      JWT_SECRET, { expiresIn: '1h' });

    res.cookie('jwtToken', token, {
      maxAge: 3600000,
      httpOnly: true,
      domain: 'localhost',
      sameSite: 'strict'
    })

    res.status(200).json({
      message: "Login successful",
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const userRegistrationValidationRules = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } }) // Ensure valid email format with Joi's built-in email validation
    .pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),

  password: Joi.string().required(),
});


app.post("/register", async (req, res) => {
  const { error, value } = userRegistrationValidationRules.validate(req.body);

  if (error) {
    res.status(400).json({ message: 'Please enter valid details.' });
    return;
  }

  const { firstName, lastName, email, password } = value;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "User already exists", statusCode: 400 });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "Success", statusCode: 200 });
  } catch (err) {
    res.status(500).send("Error adding user to the database");
  }
});

app.get('/user-details', verifyToken, (req, res) => {
  res.send(req.user)
});


app.post('/logout', logout);


//database connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose is connected...");
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });

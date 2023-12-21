const UserDb = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
module.exports.RegisterUser = async (req, res) => {
    // Adding user to database
    const { username, password, hintQuestion, hintAnswer } = req.body;
    const data = {
        "uname": username, "password": password, 'hintQuestion': hintQuestion, 'hintAnswer': hintAnswer
    };

    try {
        const existingUser = await UserDb.findOne({ "uname": username });
        if (existingUser) {
            res.status(409).json("exist");
        } else {
            await UserDb.insertMany(data);
            res.status(201).json('success');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json('error');
    }
}

module.exports.CheckLogin = async (req, res) => {
    // Checking user auth with password
    const { username, password } = req.body;
    try {
        let user = await UserDb.findOne({ "uname": username, "password": password });
        if (user) {
            res.status(201).json({ message: 'success', token: generateAccessToken(user._id) });
        } else {
            res.status(401).json("loginfailed");
        }
    } catch (error) {
        res.status(500).json('loginerror');
    }
};

module.exports.ResetPasswordAuth = async (req, res) => {
    try {
        //Authentication user with question and answer
        const { question, answer } = req.body;
        const user = await UserDb.findOne({ 'hintQuestion': question, 'hintAnswer': answer });
        if (user) {
            res.status(200).json({ userId: user._id });
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        console.error('Error during password reset authentication:', error);
        res.status(500).json('error');
    }
};

module.exports.ResetPassword = async (req, res) => {
    // Updating user's password
    const { userId, password } = req.body;

    try {
        const updateResult = await UserDb.updateOne({ _id: userId }, { $set: { 'password': password } });

        if (updateResult) {
            res.status(200).json('Successfully changed the password!');
        } else {
            // No document was modified, meaning the user ID was not found
            res.status(404).json('User not found or password not changed');
        }
    } catch (err) {
        console.error('Error during password reset:', err);
        res.status(500).json('Internal Server Error');
    }
};


function generateAccessToken(id) {
    // generating jwt token
    return jwt.sign({ userid: id }, process.env.SECRETKEY);
}

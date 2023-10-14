const UserDb = require('../Models/UserModel');
module.exports.RegisterUser = async (req, res) => async (req, res) => {
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
    const { username, password } = req.body;
    try {
        let user = await UserDb.findOne({ "uname": username, "password": password });
        if (user) {
            res.status(200).json("loginsuccess");
        } else {
            res.status(401).json("loginfailed");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json('loginerror');
    }
};
const jwt = require("jsonwebtoken");
const UserDb = require("../Models/UserModel");
const { ObjectId } = require("mongodb");
const authenticateUser = async (req, res, next) => {
    try {
        // decoding the jwt token and checking the user authentication
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        const userIdString = decodedToken.userid;

        const userId = new ObjectId(userIdString);
        const user = await UserDb.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({ data: 'failed' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ data: 'failed' });
    }
};

module.exports = authenticateUser;

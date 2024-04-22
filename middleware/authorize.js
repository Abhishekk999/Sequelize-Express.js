import jwt from 'jsonwebtoken';
import UserMaster from "../models/authModel.js";

const secretKey = 'ExpressJs';
const authorize = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).send({ message: "Unauthorize User" });
    } else {
        jwt.verify(token, secretKey, async (err, decode) => {
            if (err) return res.status(401).send({ message: 'Invalid Token.', err: err });
            const user = await UserMaster.findOne({
                where: {
                    id: decode['UserIdentity']
                }
            });
            if (!user) res.status(401).send({ message: "Unauthorize User" });
            if (user) req.authInfo = user; 
            next();
        })
    }
}

export default authorize;
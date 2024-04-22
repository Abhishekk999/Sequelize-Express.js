import jwt from "jsonwebtoken";
import eResultCode from "../utility/enum"
import UserMaster from "../models/authModel";
import ResponseModel from "../utility/responseModel";
import { decrypt, encrypt } from "../utility/encrypt-decrypt";
const secretKey = 'ExpressJs';

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await UserMaster.findOne({
            where: {
                username: userName
            }
        });
        const decryptedPassword = decrypt(password);
        if (user && decryptedPassword == decrypt(user.password)) {
            const token = generateToken(user);
            const response = {
                authToken: token,
                dataResponse: {
                    returnCode: eResultCode.SUCCESS,
                    description: "Login successful"
                }
            }
            res.status(200).json(response);
        } else {
            const response = {
                dataResponse: {
                    returnCode: eResultCode.AUTHENTICATION_FAILED,
                    description: "Invalid username or password."
                }
            }
            res.status(200).send(response);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
}

const register = async (req, res) => {
    try {
        const { data } = req.body;
        const {userName, password, mobileNo, emailId} = data;
        // Check if the user already exists
        const existingUser = await UserMaster.findOne({
            where: {
                username: userName
            }
        });
        const encryptedPassword = encrypt(password);
        if (existingUser) {
            return res.status(200).json({
                dataResponse: {
                    returnCode: eResultCode.USER_ALREADY_EXISTS,
                    description: "Username already exists."
                }
            });
        }

        const newUser = await UserMaster.create({
            userName,
            emailId,
            mobileNo,
            password: encryptedPassword,
        });
        const response = ResponseModel(eResultCode.SUCCESS, "User registered successfully.", newUser)
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An error occurred during registration.");
    }
};

function generateToken(userDetails) {
    const payload = {
        UserIdentity: userDetails.id,
        username: userDetails.username
    };
    const expiresIn = '1h';
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
}

const authController = {
    login,
    register
};

export default authController;
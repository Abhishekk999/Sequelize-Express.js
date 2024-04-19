import eResultCode from "../utility/enum";
import UserDetail from "../models/userModel";
import UserMaster from "../models/authModel";
import ResponseModel from "../utility/responseModel";
import { where } from "sequelize";

const getUserList = async (req, res) => {
    try {
        const userList = await UserDetail.findAll();
        const response = ResponseModel(eResultCode.SUCCESS, "Student list retrieved", userList);
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.body.data;
        const userData = await UserDetail.findOne({ where: { id: id } });
        if (!userData) {
            const response = ResponseModel(eResultCode.NOT_FOUND, 'Student not found');
            res.status(200).json(response);
            return;
        }
        const response = ResponseModel(eResultCode.SUCCESS, "Data fetch successful", [userData]);
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { id = 0, name, email, age, contact } = req.body.data;
        if (id) {
            const result = await UserDetail.update(
                { name, email, age, contact }, // fields to update
                { where: { id: id } }      // where clause
            );
            // Check if any rows were updated
            if (result[0] > 0) {
                const response = ResponseModel(eResultCode.SUCCESS, "Record updated successfully.");
                res.status(200).json(response);
            } else {
                // No rows were updated, possibly because the student does not exist
                const response = ResponseModel(eResultCode.NOT_FOUND, "user not found.");
                res.status(200).json(response);
            }
        } else {
            // Check if the email already exists
            const emailCheckResult = await UserDetail.findOne({
                where: { email: email }
            })
            if (emailCheckResult) {
                const response = ResponseModel(eResultCode.INVALID_REQUEST, "Email already exists.")
                res.status(200).json(response);
                return;
            }

            // Add new student
            const result = await UserDetail.create({
                name, email, age, contact
            })
            if (result) {
                const response = ResponseModel(eResultCode.SUCCESS, "Record saved successfully.")
                res.status(200).json(response);
            } else {
                const response = ResponseModel(eResultCode.DB_ERROR, "Failed to save data.")
                res.status(200).json(response);
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
};

const removeUser = async (req, res) => {
    try {
        const { id } = req.body.data;
        if (!id) {
            return res.status(400).send("Bad Request: No ID provided.");
        }

        const result = await UserDetail.destroy({
            where: { id }
        });

        if (result > 0) {
            const response = ResponseModel(eResultCode.SUCCESS, "Record deleted successfully.");
            res.status(200).send(response);
        } else {
            const response = ResponseModel(eResultCode.DB_ERROR, "No record found to delete.");
            res.status(404).send(response);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
};


const getUserInfo = async (req, res) => {
    try {
        const { id } = req.authInfo;

        const userInfo = await UserMaster.findOne({
            where: {
                id: id
            }
        });
        if (!userInfo) {
            const response = ResponseModel(eResultCode.NOT_FOUND, 'User not found');
            res.status(200).json(response);
            return;
        }
        const response = ResponseModel(eResultCode.SUCCESS, "User Data fetch successful", [userInfo]);
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const userController = {
    getUserList,
    getUserById,
    addUser,
    removeUser,
    getUserInfo
};

export default userController;
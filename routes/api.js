import { Router } from "express";
import authController from "../controller/authController";
import userController from "../controller/userController";
import authorize from "../middleware/authorize";
import configController from "../controller/configController";
const router = Router();

// Auth api route
/**
 * @swagger
 * /api/Auth/SignIn:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: Authenticate users and return an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Authentication failed
 */
router.post('/Auth/SignIn', authController.login);

/**
 * @swagger
 * /api/Auth/Register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Register a new user and return the user details with authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - userName
 *                   - password
 *                   - emailId
 *                   - mobileNo
 *                 properties:
 *                   userName:
 *                     type: string
 *                   password:
 *                     type: string
 *                   emailId:
 *                     type: string
 *                   mobileNo:
 *                     type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/Auth/Register', authController.register);

// User api route
router.post('/User/GetUserList', [authorize], userController.getUserList);
router.post('/User/GetUserSpecificData', [authorize], userController.getUserInfo);
router.post('/User/GetUserById', [authorize], userController.getUserById);
router.post('/User/AddEditUser', [authorize], userController.addUser);
router.post('/User/RemoveUser', [authorize], userController.removeUser);

// Menu list 
router.post('/Config/GetMenuDataList', [authorize], configController.getMenuHierarchyList);

export default router;
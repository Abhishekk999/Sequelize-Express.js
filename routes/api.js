import { Router } from "express";
import authController from "../controller/authController";
import userController from "../controller/userController";
import authorize from "../middleware/authorize";
import configController from "../controller/configController";
const router = Router();

// Auth api route
router.post('/Auth/SignIn', authController.login);
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
import eResultCode from "../utility/enum.js";
import ResponseModel from "../utility/responseModel.js";
import ConfigModel from "../models/configModel.js";

const getMenuHierarchyList = async (req, res) => {
    try {
        const menuList = await ConfigModel.findAll();
        const response = ResponseModel(eResultCode.SUCCESS, "Menu list retrieved", menuList);
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const configController = {
    getMenuHierarchyList
}

export default configController;

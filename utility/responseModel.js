const  ResponseModel = (statusCode, message, data = []) =>{
    const response = {
        data: data,
        dataResponse: {
            returnCode: statusCode,
            description: message
        }
    };
    return response
};

export default ResponseModel;
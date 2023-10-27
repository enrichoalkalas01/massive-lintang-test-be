function httpRes(status, message, data){
    return {
        code: status,
        message: message,
        data: data,
    }
}

module.exports = { httpRes }
const handleSuccess = (response) => {
    console.log(`Function successfully executed, response: ${JSON.stringify(response)}`);
    return {
        statusCode: 200,
        headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods" : "*"
        },
        body: JSON.stringify(response)
    };
};
  
const handleError = (error) => {
    console.log("Internal function error", error);
    let errorMessage = "Function execution error";
    if(error.cause?.expose) {
        errorMessage = error.message;
    }
    return {
        statusCode: 409,
        headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods" : "*"
        },
        body: JSON.stringify({ message: errorMessage })
    };
};

const throwExposableError = (message) => {
    throw Error(message, {cause: { expose: true } });
  };

module.exports = {
    handleSuccess: handleSuccess,
    handleError: handleError,
    throwExposableError: throwExposableError
};
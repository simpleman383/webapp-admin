const success = response => body => response.status(200).json({
    success: true,
    error: null,
    data: {
        ...body
    }
});

const error = response => error => response.status(400).json({
    success: false,
    error: error,
});

const response = {
    success: success,
    error: error
}

export { success, error }
export default response

const serverResponses = [
    { message: 'Invalid Bearer token', code: 401 },
    { message: 'Missing', code: 400 },
    { message: 'Invalid', code: 404 },
    { message: 'Validation error', code: 400 },
    { message: 'violates foreign key constraint', code: 308 },
    { message: 'Missing required fields', code: 400 },
    { message: 'Phone already exist in database', code: 409 }
]

const  handleResponseError = (error, res) => {
    console.error("API Error:", error);
    const errorFound = serverResponses.find((e) => new RegExp(e.message,'i').test(error.message))
    return res.status(errorFound?.code || 500).json(error.message);
}
export { handleResponseError }
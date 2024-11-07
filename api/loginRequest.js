export const loginHelper = async (email, password) => {
    const result = await fetch(
        // test server
        'http://localhost:3000/users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }
    )
    return result
}

export const loginHelper = async (email, password) => {
    const result = await fetch(
        // test server
        'https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/users/login',
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

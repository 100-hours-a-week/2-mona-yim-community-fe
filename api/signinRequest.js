export const usernameHelper = async (username) => {
    const result = fetch(
        // test server
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/users/username/check?username=${username}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const emailHelper = async (email) => {
    const result = fetch(
        // test server
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/users/email/check?email=${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const signinHelper = async (userinfo) => {
    const result = fetch(
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/users/signin`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userinfo),
        }
    )
    return result
}

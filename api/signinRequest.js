export const usernameHelper = async (username) => {
    const result = fetch(
        `http://localhost:3000/users/username/check?username=${username}`,
        {
            method: 'POST',
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
        `http://localhost:3000/users/email/check?email=${email}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const signinHelper = async (userinfo) => {
    const result = fetch(`http://localhost:3000/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userinfo),
    })
    return result
}

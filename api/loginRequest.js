export const loginHelper = async (email, password) => {
    const result = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    return result
}

export const profileHelper = async (userId, username) => {
    const result = await fetch('http://localhost:3000/users/profile', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            username: username,
        }),
    })
    return result
}

export const passwordHelper = async (userId, password) => {
    const result = await fetch('http://localhost:3000/users/password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            password: password,
        }),
    })
    return result
}

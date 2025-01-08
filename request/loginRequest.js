const serverPORT = 'http://15.165.75.46:3000/api'

export const loginHelper = async (email, password) => {
    const result = await fetch(`${serverPORT}/`, {
        method: 'POST',
        credentials: 'include',
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

export const logoutHelper = async () => {
    const result = await fetch(`${serverPORT}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

export const profileHelper = async (username, profileImage) => {
    const formData = new FormData()

    formData.append('username', username)
    formData.append('profileImage', profileImage)

    const result = await fetch(`${serverPORT}/users/profile`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
    })
    return result
}

export const passwordHelper = async (password) => {
    const result = await fetch(`${serverPORT}/users/password`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
        }),
    })
    return result
}

export const userHelper = async (userId) => {
    const result = await fetch(`${serverPORT}/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await result.json()
}

export const selfHelper = async () => {
    const result = await fetch(`${serverPORT}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await result.json()
}

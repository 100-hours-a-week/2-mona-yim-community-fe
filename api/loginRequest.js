const clientURL = 'http://localhost:3000/'

export const loginHelper = async (email, password) => {
    const result = await fetch('http://localhost:13306/', {
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

export const profileHelper = async (username, profileImage) => {
    const formData = new FormData()

    formData.append('username', username)
    formData.append('profileImage', profileImage)

    const result = await fetch('http://localhost:13306/users/profile', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
    })
    return result
}

export const passwordHelper = async (password) => {
    const result = await fetch('http://localhost:13306/users/password', {
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
    const result = await fetch(`http://localhost:13306/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await result.json()
}

export const selfHelper = async () => {
    const result = await fetch(`http://localhost:13306/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await result.json()
}

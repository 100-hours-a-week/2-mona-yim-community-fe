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

export const profileHelper = async (userId, username, profileImage) => {
    const formData = new FormData()

    formData.append('userId', userId)
    formData.append('username', username)
    formData.append('profileImage', profileImage)

    console.log(formData)

    const result = await fetch('http://localhost:3000/users/profile', {
        method: 'PATCH',
        body: formData,
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

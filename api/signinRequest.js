export const usernameHelper = async (username) => {
    const result = fetch(
        `http://localhost:3000/users/username/check?username=${username}`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const emailHelper = async (email) => {
    const result = fetch(
        `http://localhost:3000/users/email/check?email=${email}`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const signinHelper = async (userinfo) => {
    const formData = new FormData()

    formData.append('email', userinfo.email)
    formData.append('password', userinfo.password)
    formData.append('username', userinfo.username)

    if (userinfo.profileImage) {
        formData.append('profileImage', userinfo.profileImage) // 파일 추가
    }

    const result = await fetch(`http://localhost:3000/signin`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })

    return result
}

export const signoutHelper = async () => {
    const result = fetch(`http://localhost:3000/users/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

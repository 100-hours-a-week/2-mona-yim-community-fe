const serverPORT = 'http://15.165.75.46:3000/api'

export const usernameHelper = async (username) => {
    const result = fetch(
        `${serverPORT}/users/username/check?username=${username}`,
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
    const result = fetch(`${serverPORT}/users/email/check?email=${email}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
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

    const result = await fetch(`${serverPORT}/signin`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })

    return result
}

export const signoutHelper = async () => {
    const result = fetch(`${serverPORT}/users/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

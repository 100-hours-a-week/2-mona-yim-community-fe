export const validEmail = (email) => {
    const emailPattern =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

    return emailPattern.test(email)
}

export const validPassword = (password) => {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    return passwordPattern.test(password)
}

export const validUsername = (username) => {
    const usernamePattern = /^[가-힣a-zA-Z0-9]{2,10}$/
    return usernamePattern.test(username)
}

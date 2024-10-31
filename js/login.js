import { validEmail, validPassword } from '../utils/function.js'

document.getElementById('id').addEventListener('input', validateEmail)
document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('login').addEventListener('click', handleLogin)

function validateEmail() {
    const emailInput = document.getElementById('id')
    const emailValue = emailInput.value

    if (!emailValue || !validEmail(emailValue)) {
        document.getElementById('helper').textContent =
            '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)'
    } else {
        document.getElementById('helper').textContent = ''
        return true
    }
    return false
}

function validatePassword() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value

    if (!passwordValue) {
        document.getElementById('helper').textContent =
            '*비밀번호를 입력해주세요'
    } else if (!validPassword(passwordValue)) {
        document.getElementById('helper').textContent =
            '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    } else {
        document.getElementById('helper').textContent = ''
        return true
    }
    return false
}

function handleLogin() {
    const loginButton = document.getElementById('login')

    if (validateEmail() && validatePassword()) {
        loginButton.style.backgroundColor = '#7F6AEE'
        window.location.href = '/posts' // 지우기
        // fetch: 이메일 & 비밀번호 확인
        /* 
                fetch('/api/users')
            .then((response) => response.json())
            .then((users) => {
                const user = users.find(
                    (u) => u.email === email && u.password === password
                )
                // 로그인 성공
                if (user) {
                    window.location.href = '/posts'
                }
                // 로그인 실패
                else {
                    document.getElementById('helper').textContent =
                        '*비밀번호가 다릅니다.'
                    loginButton.style.backgroundColor = '#ACA0EB'
                }
            })
            .catch((error) => {
                console.error('로그인 중 오류 발생:', error)
                loginButton.style.backgroundColor = '#ACA0EB'
            })
        */
    } else {
        loginButton.style.backgroundColor = '#ACA0EB'
    }
}

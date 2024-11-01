import { validEmail, validPassword, validUsername } from '../utils/function.js'

document.getElementById('profile').addEventListener('input', handleProfile)
document.getElementById('id').addEventListener('input', validateEmail)
document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('pwcheck').addEventListener('input', validateSame)
document.getElementById('username').addEventListener('input', validateUsername)
document.getElementById('signin').addEventListener('click', handleSignin)

document.querySelector('.circle').addEventListener('click', function () {
    document.getElementById('profile').click() // 프로필 사진 업로드 창 열기
})

function handleProfile() {
    const profileInput = document.getElementById('profile')
    const profileValue = profileInput.value

    if (profileValue) {
        document.getElementById('helper-profile').textContent = ''
        return true
    } else {
        document.getElementById('helper-profile').textContent =
            '*프로필 사진을 추가해주세요.'
    }
    return false
}

function validateEmail() {
    const emailInput = document.getElementById('id')
    const emailValue = emailInput.value

    // 비어 있는 경우
    if (!emailValue) {
        document.getElementById('helper-id').textContent =
            '*이메일을 입력해주세요.'
        // 이메일이 유효하지 않은 경우
    } else if (!validEmail(emailValue)) {
        document.getElementById('helper-id').textContent =
            '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)'
        // 이메일이 중복인 경우
        // } else if (checkDuplicateEmail(emailValue)) {
        //     document.getElementById('helper-id').textContent =
        //         '*중복된 이메일 입니다.'
    } else {
        document.getElementById('helper-id').textContent = ''
        return true
    }
    return false
}

// 데이터 가져오기 함수
// async function fetchUserData(url) {
//     try {
//         const response = await fetch(url)
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`)
//         }
//         const data = await response.json()
//         return data
//     } catch (error) {
//         console.error('Error: ', error)
//         return null
//     }
// }

// const users = await fetchUserData('/api/users')

// function checkDuplicateEmail(newemail) {
//     const emailExist = users.some(user => user.email.trim().toLowerCase() === newemail.trim().toLowerCase());
//     return emailExist;
// }

// function checkDuplicateUsername(newusername) {
//     const usernameExist = users.some(user => user.username.trim().toLowerCase() === newusername.trim().toLowerCase());
//     return usernameExist;
// }

function validatePassword() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value

    if (!passwordValue) {
        document.getElementById('helper-pw').textContent =
            '*비밀번호를 입력해주세요'
    } else if (!validPassword(passwordValue)) {
        document.getElementById('helper-pw').textContent =
            '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    } else {
        document.getElementById('helper-pw').textContent = ''
        return true
    }
    return false
}

function validateSame() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value
    const passwordCheckInput = document.getElementById('pwcheck')
    const passwordCheckValue = passwordCheckInput.value
    if (!passwordValue) {
        document.getElementById('helper-pwcheck').textContent =
            '*비밀번호를 한번더 입력해주세요'
    } else if (passwordValue !== passwordCheckValue) {
        document.getElementById('helper-pwcheck').textContent =
            '비밀번호가 다릅니다.'
    } else {
        document.getElementById('helper-pwcheck').textContent = ''
        return true
    }
    return false
}

function validateUsername() {
    const usernameInput = document.getElementById('username')
    const usernameValue = usernameInput.value

    if (!usernameValue) {
        document.getElementById('helper-username').textContent =
            '*닉네임을 입력해주세요.'
    } else if (/\s/.test(usernameValue)) {
        document.getElementById('helper-username').textContent =
            '*띄어쓰기를없애주세요'
    } else if (usernameValue.length > 10) {
        document.getElementById('helper-username').textContent =
            '*닉네임은최대 10자까지 작성 가능합니다.'
        // 닉네임 중복 시
        // }else if (checkDuplicateUsername(usernameValue)) {
        //     document.getElementById('helper-username').textContent =
        //         '*중복된 닉네임 입니다.'
    } else {
        document.getElementById('helper-username').textContent = ''
        return true
    }

    return false
}

function handleSignin() {
    const signinButton = document.getElementById('signin')

    if (
        handleProfile() &&
        validateEmail() &&
        validatePassword() &&
        validateSame() &&
        validateUsername()
    ) {
        signinButton.style.backgroundColor = '#7F6AEE'
        window.location.href = '/'
    } else {
        loginButton.style.backgroundColor = '#ACA0EB'
    }
}

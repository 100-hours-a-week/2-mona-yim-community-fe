import { validEmail, validPassword, validUsername } from '../utils/function.js'
import {
    emailHelper,
    signinHelper,
    usernameHelper,
} from '../request/signinRequest.js'

document.getElementById('profile').addEventListener('input', handleProfile)
document.getElementById('id').addEventListener('input', validateEmail)
document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('pwcheck').addEventListener('input', validateSame)
document.getElementById('username').addEventListener('input', validateUsername)
document.getElementById('signin').addEventListener('click', handleSignin)

document.querySelector('.circle').addEventListener('click', function () {
    document.getElementById('profile').click() // 프로필 사진 업로드 창 열기
})

let emailStatus = false,
    pwStatus = false,
    pwCheckStatus = false,
    usernameStatus = false

const userInfo = {
    email: '',
    password: '',
    username: '',
    profileImage: null,
}

function handleProfile() {
    const profileInput = document.getElementById('profile')
    const profileValue = profileInput.files[0]

    if (profileValue) {
        userInfo.profileImage = profileValue

        const reader = new FileReader()
        reader.onload = function (event) {
            const imageURL = event.target.result
            // 업로드한 이미지를 #circle의 배경으로 설정
            document.getElementById(
                'circle'
            ).style.backgroundImage = `url(${imageURL})`
            document.getElementById('circle').style.backgroundSize = 'cover' // 이미지 크기를 채우기 위해 설정
            document.getElementById('circle').style.backgroundPosition =
                'center' // 이미지 중앙 정렬
        }

        reader.readAsDataURL(profileValue)
        document.getElementById('plus-sign').textContent = ''
        document.getElementById('helper-profile').textContent = ''
    } else {
        userInfo.profileImage = ''
        document.getElementById('helper-profile').textContent =
            '*프로필 사진을 추가해주세요.'
    }
    return true
}

async function validateEmail() {
    const emailInput = document.getElementById('id')
    const emailValue = emailInput.value
    userInfo.email = emailValue

    // 비어 있는 경우
    if (!emailValue) {
        document.getElementById('helper-id').textContent =
            '*이메일을 입력해주세요.'
        // 이메일이 유효하지 않은 경우
    } else if (!validEmail(emailValue)) {
        document.getElementById('helper-id').textContent =
            '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)'
    } else {
        const response = await emailHelper(emailValue)
        if (response.status === 200) {
            document.getElementById('helper-id').textContent = ''
            emailStatus = true
            activateButton()
            return
        } else {
            document.getElementById('helper-id').textContent =
                '*중복된 이메일 입니다.'
        }
    }
    emailStatus = false
    deactivateButton()
}

function validatePassword() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value
    userInfo.password = passwordValue

    if (!passwordValue) {
        document.getElementById('helper-pw').textContent =
            '*비밀번호를 입력해주세요'
    } else if (!validPassword(passwordValue)) {
        document.getElementById('helper-pw').textContent =
            '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    } else {
        document.getElementById('helper-pw').textContent = ''
        pwStatus = true
        activateButton()
        return
    }
    pwStatus = false
    deactivateButton()
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
        pwCheckStatus = true
        activateButton()
        return
    }
    pwCheckStatus = false
    deactivateButton()
}

async function validateUsername() {
    const usernameInput = document.getElementById('username')
    const usernameValue = usernameInput.value
    userInfo.username = usernameValue

    if (!usernameValue) {
        document.getElementById('helper-username').textContent =
            '*닉네임을 입력해주세요.'
    } else if (/\s/.test(usernameValue)) {
        document.getElementById('helper-username').textContent =
            '*띄어쓰기를없애주세요'
    } else if (usernameValue.length > 10) {
        document.getElementById('helper-username').textContent =
            '*닉네임은최대 10자까지 작성 가능합니다.'
    } else {
        const response = await usernameHelper(usernameValue)
        if (response.status === 200) {
            document.getElementById('helper-username').textContent = ''
            usernameStatus = true
            activateButton()
            return
        } else {
            document.getElementById('helper-username').textContent =
                '*중복된 닉네임 입니다.'
        }
    }

    usernameStatus = false
    deactivateButton()
}

async function handleSignin() {
    const signinButton = document.getElementById('signin')

    if (emailStatus && pwStatus && pwCheckStatus && usernameStatus) {
        const response = await signinHelper(userInfo)
        if (response.status === 201) {
            window.location.href = '/'
        }
    }
}

function activateButton() {
    const signinButton = document.getElementById('signin')
    if (emailStatus && pwStatus && pwCheckStatus && usernameStatus) {
        signinButton.style.backgroundColor = '#fd0072'
    }
}

function deactivateButton() {
    const signinButton = document.getElementById('signin')
    signinButton.style.backgroundColor = '#eaa7c5'
}

function init() {
    emailStatus = false
    pwStatus = false
    pwCheckStatus = false
    usernameStatus = false
}

init()

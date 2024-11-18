import { validPassword } from '../utils/function.js'
import { passwordHelper } from '../api/loginRequest.js'

document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('pwcheck').addEventListener('input', validateSame)
document.getElementById('edit').addEventListener('click', handleEdit)
document
    .getElementById('profile-photo')
    .addEventListener('click', handleDropdown)

function validatePassword() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value
    const passwordCheckInput = document.getElementById('pwcheck')
    const passwordCheckValue = passwordCheckInput.value

    if (!passwordValue) {
        document.getElementById('helper-pw').textContent =
            '*비밀번호를 입력해주세요'
    } else if (!validPassword(passwordValue)) {
        document.getElementById('helper-pw').textContent =
            '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
    } else if (passwordValue !== passwordCheckValue) {
        document.getElementById('helper-pw').textContent =
            '비밀번호가 확인과 다릅니다.'
    } else {
        document.getElementById('helper-pw').textContent = ''
        if (passwordValue === passwordCheckValue) activateButton()
        return true
    }
    deactivateButton()
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
        document.getElementById('edit').style.backgroundColor = '#ACA0EB'
    } else if (passwordValue !== passwordCheckValue) {
        document.getElementById('helper-pwcheck').textContent =
            '비밀번호가 다릅니다.'
        document.getElementById('edit').style.backgroundColor = '#ACA0EB'
    } else {
        document.getElementById('helper-pw').textContent = ''
        document.getElementById('helper-pwcheck').textContent = ''
        activateButton()
        return true
    }
    deactivateButton()
    return false
}

function activateButton() {
    document.getElementById('edit').style.backgroundColor = '#7F6AEE'
}

function deactivateButton() {
    document.getElementById('edit').style.backgroundColor = '#ACA0EB'
}

function showToast() {
    const toastContainer = document.getElementById('toast-container')
    toastContainer.classList.add('show')
    // 3초 후 토스트 메시지 숨기기
    setTimeout(() => {
        toastContainer.classList.remove('show')
    }, 500)
}

async function handleEdit() {
    const passwordInput = document.getElementById('pw')
    const passwordValue = passwordInput.value

    if (validatePassword() && validateSame()) {
        const userId = 3
        const deleteResponse = await passwordHelper(userId, passwordValue)
        showToast()
    }
}

function handleDropdown() {
    const dropdown = document.getElementById('dropdown')
    dropdown.style.display = 'flex'
}

document.querySelectorAll('.dropdown p').forEach((p) => {
    p.addEventListener('mouseover', () => {
        p.style.backgroundColor = '#E9E9E9'
    })

    p.addEventListener('mouseout', () => {
        p.style.backgroundColor = '' // 원래 배경색으로 되돌림
    })

    p.addEventListener('click', () => {
        if (p.textContent == '회원정보 수정') {
            window.location.href = '/edit_profile'
        }
        if (p.textContent == '비밀번호 수정') {
            window.location.href = '/edit_password'
        }
        if (p.textContent == '로그아웃') {
            window.location.href = '/'
        }
    })
})

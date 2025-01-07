import { validPassword } from '../utils/function.js'
import { passwordHelper } from '../api/loginRequest.js'
import { initializeDropdown, initializeProfile } from './initialize.js'

document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('pwcheck').addEventListener('input', validateSame)
document.getElementById('edit').addEventListener('click', handleEdit)

function validatePassword() {
    const passwordValue = document.getElementById('pw').value
    const passwordCheckValue = document.getElementById('pwcheck').value

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
    const passwordValue = document.getElementById('pw').value
    const passwordCheckValue = document.getElementById('pwcheck').value

    if (!passwordValue) {
        document.getElementById('helper-pwcheck').textContent =
            '*비밀번호를 한번더 입력해주세요'
        document.getElementById('edit').style.backgroundColor = '#eaa7c5'
    } else if (passwordValue !== passwordCheckValue) {
        document.getElementById('helper-pwcheck').textContent =
            '비밀번호가 다릅니다.'
        document.getElementById('edit').style.backgroundColor = '#eaa7c5'
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
    document.getElementById('edit').style.backgroundColor = '#fd0072'
}

function deactivateButton() {
    document.getElementById('edit').style.backgroundColor = '#eaa7c5'
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
    const passwordValue = document.getElementById('pw').value

    if (validatePassword() && validateSame()) {
        const deleteResponse = await passwordHelper(passwordValue)
        showToast()
    }
}

initializeProfile()
initializeDropdown()

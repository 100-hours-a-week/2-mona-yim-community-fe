import { validPassword } from '../utils/function.js'

document.getElementById('pw').addEventListener('input', validatePassword)
document.getElementById('pwcheck').addEventListener('input', validateSame)
document.getElementById('edit').addEventListener('click', handleEdit)

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
        document.getElementById('edit').style.backgroundColor = '#ACA0EB'
    } else if (passwordValue !== passwordCheckValue) {
        document.getElementById('helper-pwcheck').textContent =
            '비밀번호가 다릅니다.'
        document.getElementById('edit').style.backgroundColor = '#ACA0EB'
    } else {
        document.getElementById('helper-pwcheck').textContent = ''
        document.getElementById('edit').style.backgroundColor = '#7F6AEE'
        return true
    }
    return false
}

function handleEdit() {
    if (validatePassword() && validateSame()) {
        // 수정 완료 토스 메시지
    }
}

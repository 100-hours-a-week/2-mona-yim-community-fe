document
    .getElementById('edit-button')
    .addEventListener('click', handleprofileEdit)
document.getElementById('deleteAccount').addEventListener('click', handleModal)
document.getElementById('cancel').addEventListener('click', handleCancelModal)
document.getElementById('confirm').addEventListener('click', handleConfirmModal)
document
    .getElementById('profile-photo')
    .addEventListener('click', handleDropdown)

function handleprofileEdit() {
    const usernameInput = document.getElementById('username')
    const usernameValue = usernameInput.value

    if (!usernameValue) {
        document.getElementById('helper-username').textContent =
            '*닉네임을 입력해주세요.'
    } else if (usernameValue.length > 10) {
        document.getElementById('helper-username').textContent =
            '*닉네임은 최대 10자까지 작성 가능합니다.'
    } else {
        document.getElementById('helper-username').textContent = ''
        showToast()
    }
    // 닉네임 중복 시 *중복된 닉네임
}

function showToast() {
    const toastContainer = document.getElementById('toast-container')
    toastContainer.classList.add('show')
    // 3초 후 토스트 메시지 숨기기
    setTimeout(() => {
        toastContainer.classList.remove('show')
    }, 500)
}

function handleModal() {
    const modal = document.getElementById('modal')
    document.body.style.overflow = 'hidden'
    modal.style.display = 'flex'
}

function handleCancelModal() {
    const modal = document.getElementById('modal')
    document.body.style.overflow = 'auto'
    modal.style.display = 'none'
}

function handleConfirmModal() {
    // 계정 삭제
    window.location.href = '/'
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

document.getElementById('profileContainer').addEventListener('click', () => {
    document.getElementById('profile').click()
})

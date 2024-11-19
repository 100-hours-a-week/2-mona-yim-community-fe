import { usernameHelper } from '../api/signinRequest.js'
import { profileHelper, userHelper } from '../api/loginRequest.js'
import { signoutHelper } from '../api/signinRequest.js'
import { initializeDropdown, initializeProfile } from './initialize.js'

document.addEventListener('DOMContentLoaded', fetchUserInfo)
document
    .getElementById('edit-button')
    .addEventListener('click', handleprofileEdit)
document.getElementById('deleteAccount').addEventListener('click', handleModal)
document.getElementById('cancel').addEventListener('click', handleCancelModal)
document.getElementById('confirm').addEventListener('click', handleConfirmModal)

async function fetchUserInfo() {
    const userId = 4 //temp
    const response = await userHelper(4)
    console.log(response)
    document.getElementById('user-email').textContent = `${response.email}`
    document.getElementById('username').value = `${response.username}`
    document.getElementById('user-image').src = response.profileImage
        ? `http://localhost:3000/images/${response.profileImage}`
        : '/assets/profile_image.jpg'
}

async function handleprofileEdit() {
    const usernameInput = document.getElementById('username')
    const usernameValue = usernameInput.value
    const profileImageInput = document.getElementById('profile')
    const profileImageValue = profileImageInput.files[0]

    if (!usernameValue) {
        document.getElementById('helper-username').textContent =
            '*닉네임을 입력해주세요.'
    } else if (usernameValue.length > 10) {
        document.getElementById('helper-username').textContent =
            '*닉네임은 최대 10자까지 작성 가능합니다.'
    } else {
        const response = await usernameHelper(usernameValue)
        if (response.status === 200) {
            const userId = 3
            const editResponse = await profileHelper(
                userId,
                usernameValue,
                profileImageValue
            )
            document.getElementById('helper-username').textContent = ''
            showToast()
        } else {
            document.getElementById('helper-username').textContent =
                '*중복된 닉네임 입니다.'
        }
    }
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

async function handleConfirmModal() {
    // 계정 삭제
    const userId = 4
    const response = await signoutHelper(userId)
    window.location.href = '/'
}

document.getElementById('profileContainer').addEventListener('click', () => {
    document.getElementById('profile').click()
})

initializeProfile()
initializeDropdown()

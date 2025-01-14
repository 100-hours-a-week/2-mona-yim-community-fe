import { logoutHelper, selfHelper } from '../request/loginRequest.js'
export const myUrl = 'http://43.201.75.102'
export const imageUrl = 'https://d3bz1yrn2gzhzb.cloudfront.net'

export function initializeDropdown() {
    const dropdown = document.getElementById('dropdown')
    const isLoggedIn = !!localStorage.getItem('userId')

    const menuItems = isLoggedIn
        ? ['회원정보 수정', '비밀번호 수정', '로그아웃']
        : ['로그인']

    menuItems.forEach((text) => {
        const p = document.createElement('p')
        p.textContent = text
        p.addEventListener('mouseover', () => {
            p.style.backgroundColor = '#E9E9E9'
        })
        p.addEventListener('mouseout', () => {
            p.style.backgroundColor = '' // 원래 배경색으로 되돌림
        })
        p.addEventListener('click', () => {
            if (p.textContent === '회원정보 수정') {
                window.location.href = '/users/profile'
            } else if (p.textContent === '비밀번호 수정') {
                window.location.href = '/users/password'
            } else if (p.textContent === '로그아웃') {
                logoutHelper()
                localStorage.clear()
                window.location.href = '/'
            } else if (p.textContent === '로그인') {
                window.location.href = '/'
            }
        })
        dropdown.appendChild(p)
    })

    document
        .getElementById('profile-photo')
        .addEventListener('click', handleDropdown)
}

function handleDropdown() {
    const dropdown = document.getElementById('dropdown')
    if (dropdown.style.display === 'flex') {
        dropdown.style.display = 'none' // 숨기기
    } else {
        dropdown.style.display = 'flex' // 표시
    }
}

export function initializeProfile() {
    document.addEventListener('DOMContentLoaded', handleProfilePhoto)
}

export function reloadProfile() {
    handleProfilePhoto()
}

async function handleProfilePhoto() {
    const userData = await selfHelper()
    const profilePhotoElement = document.getElementById('profile-photo')
    const profileImageUrl = userData.profileImage
        ? `${imageUrl}/images/${userData.profileImage}`
        : '/assets/profile_image.jpg'
    profilePhotoElement.src = profileImageUrl
}

import { userHelper } from '../api/loginRequest.js'
import { postsHelper, postHelper } from '../api/postsRequest.js'

document.addEventListener('DOMContentLoaded', fetchPosts)
document.getElementById('create').addEventListener('mouseover', handleHover)
document.getElementById('create').addEventListener('mouseout', handleUnhover)
document.getElementById('create').addEventListener('click', handleCreate)

function handleHover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#7F6AEE'
}

function handleUnhover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#ACA0EB'
}

function handleCreate() {
    window.location.href = '/make_post'
}

function formatCount(count) {
    if (count >= 1000) {
        const formattedCount = Math.floor(count / 1000) + 'k'
        return formattedCount
    }
    return count
}

async function fetchPosts() {
    const response = await postsHelper() // userId 고쳐넣기
    const posts = await response.json()

    posts.forEach((postData) => createPosts(postData))
}

async function createPosts(postData) {
    const userData = await userHelper(postData.userId)
    const postsContainer = document.getElementById('posts-container')
    const postContainer = document.createElement('div')
    postContainer.classList.add('post-container')

    // 제목
    const title = document.createElement('h2')
    title.textContent = postData.title
    postContainer.appendChild(title)

    // 정보
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('info')
    infoDiv.innerHTML = `<p class="likes">좋아요 ${formatCount(
        postData.likes
    )}</p>
                        <p class="comments">댓글 ${formatCount(
                            postData.comments
                        )}</p>
                        <p class="views">조회수 ${formatCount(
                            postData.views
                        )}</p>
                        <p class="time">${postData.time}</p>`

    postContainer.appendChild(infoDiv)

    const hr = document.createElement('hr')
    hr.setAttribute('color', '#f4f5f7')
    postContainer.appendChild(hr)

    // 작성자 정보
    const writerDiv = document.createElement('div')
    writerDiv.classList.add('writer')
    const profileImg = document.createElement('img')
    profileImg.classList.add('profile')
    profileImg.src = userData.profileImage
        ? `http://localhost:3000/images/${userData.profileImage}`
        : '/assets/profile_image.jpg'
    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = userData.username
    writerDiv.appendChild(profileImg)
    writerDiv.appendChild(name)

    postContainer.appendChild(writerDiv)

    postContainer.addEventListener('click', () => {
        window.location.href = `/posts/${postData.postId}`
    })

    postsContainer.appendChild(postContainer)
}

document.querySelectorAll('.post-container').forEach((post) => {
    post.addEventListener('click', (event) => {
        window.location.href = '/post'
    })
})

document
    .getElementById('profile-photo')
    .addEventListener('click', handleDropdown)

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

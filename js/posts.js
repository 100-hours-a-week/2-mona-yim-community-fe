import { userHelper } from '../request/loginRequest.js'
import { postsHelper } from '../request/postsRequest.js'
import {
    imageUrl,
    initializeDropdown,
    initializeProfile,
} from './initialize.js'
import { myUrl } from './initialize.js'

document.addEventListener('DOMContentLoaded', fetchPosts)
document.getElementById('create').addEventListener('mouseover', handleHover)
document.getElementById('create').addEventListener('mouseout', handleUnhover)
document.getElementById('create').addEventListener('click', handleCreate)

function handleHover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#eaa7c5'
}

function handleUnhover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#fd0072'
}

function handleCreate() {
    if (!localStorage.getItem('userId')) {
        alert('😻: 로그인이 필요합니다')
    } else {
        window.location.href = '/make_post'
    }
}

function formatCount(count) {
    if (count >= 1000) {
        const formattedCount = Math.floor(count / 1000) + 'k'
        return formattedCount
    }
    return count
}

async function fetchPosts() {
    const response = await postsHelper()
    const posts = await response.json()

    for (const postData of posts) {
        await createPosts(postData)
    }
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
    // 날짜 형식 변경
    const date = new Date(postData.time)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

    infoDiv.innerHTML = `<p class="likes">좋아요 ${formatCount(
        postData.likes
    )}</p>
                        <p class="comments">댓글 ${formatCount(
                            postData.comments
                        )}</p>
                        <p class="views">조회수 ${formatCount(
                            postData.views
                        )}</p>
                        <p class="time">${formattedDate}</p>`

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
        ? `${imageUrl}/images/${userData.profileImage}`
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

initializeProfile()
initializeDropdown()

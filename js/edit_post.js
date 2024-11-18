import { postHelper, reUploadHelper } from '../api/postsRequest.js'

document.addEventListener('DOMContentLoaded', fetchPostInfo)
document.getElementById('edit').addEventListener('click', handlePostEdit)

async function fetchPostInfo() {
    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 2]
    const responsePost = await postHelper(postId)
    console.log(responsePost)
    editPost(await responsePost.json())
}

function editPost(postData) {
    const subject = document.getElementById('subject')
    subject.value = postData.title

    const content = document.getElementById('content')
    content.textContent = postData.postContent

    const postImage = document.getElementById('post_image')
    console.log(postData.postImage)
    if (postData.postImage) {
        postImage.value = `/images/${postData.postImage}`
    }
}

async function handlePostEdit() {
    // 게시글이 수정되고, 해당 게시글 상세보기로 이동
    // 밑에 안 확실 다시 확인
    const subject = document.getElementById('subject').value
    const content = document.getElementById('content').value
    const postImage = document.getElementById('post_image').files[0]

    const postData = {
        title: subject,
        postImage: postImage,
        postContent: content,
    }
    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 2]
    const response = await reUploadHelper(postId, postData)

    window.location.href = `/posts/${postId}`
}

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

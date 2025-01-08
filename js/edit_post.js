import { postHelper, reUploadHelper } from '../request/postsRequest.js'
import { initializeDropdown, initializeProfile } from './initialize.js'

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
    const subject = document.getElementById('subject').value
    const content = document.getElementById('content').value
    const postImage = document.getElementById('post_image').files[0]

    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 2]
    const response = await reUploadHelper(postId, subject, content, postImage)

    window.location.href = `/posts/${postId}`
}

initializeProfile()
initializeDropdown()

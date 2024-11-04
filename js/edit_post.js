import { postHelper, reUploadHelper } from '../api/postsRequest.js'

document.addEventListener('DOMContentLoaded', fetchPostInfo)
document.getElementById('edit').addEventListener('click', handlepostEdit)

async function fetchPostInfo() {
    const postId = 1
    const responsePost = await postHelper(postId)
    editPost(await responsePost.json())
}

function editPost(postData) {
    const subject = document.getElementById('subject')
    subject.value = postData.title

    const content = document.getElementById('content')
    content.textContent = postData.postContent

    const postImage = document.getElementById('content')
}

async function handlepostEdit() {
    // 게시글이 수정되고, 해당 게시글 상세보기로 이동
    // 밑에 안 확실 다시 확인
    const subject = document.getElementById('subject').value
    const content = document.getElementById('content').value
    const postImage = document.getElementById('content').src

    const postData = {
        title: subject,
        content: content,
        postImage: postImage,
    }
    const postId = 1
    const response = await reUploadHelper(postId, postData)

    window.location.href = '/post'
}

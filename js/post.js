import {
    postHelper,
    commentsHelper,
    postDeleteHelper,
    commentUploadHelper,
    commentReuploadHelper,
    commentDeleteHelper,
} from '../api/postsRequest.js'

import { formatDate } from '../utils/function.js'

document.addEventListener('DOMContentLoaded', fetchPostInfo)
document.getElementById('edit-button').addEventListener('click', handleEdit)
document.getElementById('delete-button').addEventListener('click', handleDelete)
document.getElementById('comment-text').addEventListener('input', handleComment)
document
    .getElementById('comment-upload')
    .addEventListener('click', handleCommentUpload)
document.getElementById('cancel').addEventListener('click', handleCancelModal)
document.getElementById('confirm').addEventListener('click', handleConfirmModal)

function handleEdit() {
    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 1]
    window.location.href = `/posts/${postId}/edit_post`
}

function handleDelete() {
    const modal = document.getElementById('modal')
    const modalTitle = document.querySelector('#modal .modal-content h2')
    modalTitle.textContent = '게시글을 삭제하시겠습니까?'
    document.body.style.overflow = 'hidden' // 스크롤 비활성화
    modal.style.display = 'flex'
}

function handleComment() {
    const commentInput = document.getElementById('comment-text')
    const commentValue = commentInput.value
    const commentButton = document.getElementById('comment-upload')

    if (!commentValue) {
        commentButton.style.backgroundColor = '#ACA0EB'
    } else {
        commentButton.style.backgroundColor = '#7F6AEE'
    }
}

async function handleCommentUpload() {
    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 1]
    const commentInput = document.getElementById('comment-text')
    const commentValue = commentInput.value
    const actionType = document.getElementById('comment-upload').dataset.action
    if (commentValue) {
        // 댓글 생성
        if (actionType === 'upload') {
            const commentData = {
                username: '니누',
                time: `${formatDate()}`,
                content: `${commentValue}`,
            }
            const response = await commentUploadHelper(postId, commentData)
        }
        // 댓글 수정
        else {
            const commentData = {
                content: `${commentValue}`,
            }
            const commentId =
                document.getElementById('comment-upload').dataset.id
            const response = await commentReuploadHelper(
                postId,
                commentId,
                commentData
            )
            document.getElementById('comment-text').dataset.action = 'upload'
        }
        window.location.href = `/posts/${postId}`
    }
}

function formatCount(count) {
    if (count >= 1000) {
        const formattedCount = Math.floor(count / 1000) + 'k'
        return formattedCount
    }
    return count
}

const commentsContainer = document.querySelector('.comments')

commentsContainer.addEventListener('click', (event) => {
    // 수정 버튼 클릭 시
    if (event.target.closest('.modify')) {
        const commentId = event.target.dataset.id
        document
            .getElementById('comment-upload')
            .setAttribute('data-id', commentId)
        const commentContainer =
            event.target.closest('.comment-info').nextElementSibling
        const commentText =
            commentContainer.querySelector('.comment-content').textContent
        document.getElementById('comment-upload').dataset.action = 'edit'

        // 텍스트 박스에 댓글 내용 설정
        document.getElementById('comment-text').value = commentText
        document.getElementById('comment-upload').textContent = '댓글 수정'
    }

    // 삭제 버튼 클릭 시
    if (event.target.closest('.delete')) {
        const commentId = event.target.dataset.id
        const modal = document.getElementById('modal')
        const modalTitle = document.querySelector('#modal .modal-content h2')
        modalTitle.textContent = '댓글을 삭제하시겠습니까?'
        document.getElementById('confirm').dataset.action = 'comment'
        document.getElementById('confirm').dataset.id = commentId

        // 모달 열기 및 스크롤 비활성화
        document.body.style.overflow = 'hidden'
        modal.style.display = 'flex'
    }
})

function handleCancelModal() {
    const modal = document.getElementById('modal')
    document.body.style.overflow = 'auto' // 스크롤 다시 활성화
    modal.style.display = 'none'
}

// 모달 배경 클릭 시 모달 닫기
document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target.id === 'modal') {
        handleCancelModal()
    }
})

async function handleConfirmModal() {
    const actionType = document.getElementById('confirm').dataset.action
    // 게시글 삭제
    if (actionType === 'post') {
        const pathParts = window.location.pathname.split('/')
        const postId = pathParts[pathParts.length - 1]
        const response = await postDeleteHelper(postId)
        window.location.href = '/posts'
    }
    // 댓글 삭제
    else {
        const pathParts = window.location.pathname.split('/')
        const postId = pathParts[pathParts.length - 1]
        const commentId = document.getElementById('confirm').dataset.id
        document.getElementById('confirm').dataset.action = 'comment'
        const response = await commentDeleteHelper(postId, commentId)
        window.location.href = `/posts/${postId}`
    }
}

async function fetchPostInfo() {
    const pathParts = window.location.pathname.split('/')
    const postId = pathParts[pathParts.length - 1]
    const responsePost = await postHelper(postId)
    createPost(await responsePost.json())
    const responseComment = await commentsHelper(postId)
    const responseCommentArray = await responseComment.json()
    responseCommentArray.forEach((commentData) => createComment(commentData))
}

function createPost(postData) {
    document.querySelector('.title h2').textContent = postData.title
    document.querySelector('.info .author').textContent = postData.username
    document.querySelector('.info .time').textContent = postData.time
    document.querySelector('.contents img').src =
        '/assets/post_photo.jpeg' || postData.postImage
    document.querySelector('.contents p').textContent = postData.postContent
    document.getElementById('likes').innerHTML = `${formatCount(
        postData.likes
    )} <br />좋아요수`
    document.getElementById('views').innerHTML = `${formatCount(
        postData.views
    )} <br />조회수`
    document.getElementById('comments').innerHTML = `${formatCount(
        postData.comments
    )} <br />댓글`
}

function createComment(commentData) {
    const commentsContainer = document.querySelector('.comments')

    const commentInfoDiv = document.createElement('div')
    commentInfoDiv.classList.add('comment-info')

    const profileImage = document.createElement('img')
    profileImage.classList.add('profile')
    profileImage.src = '/assets/profile_image.jpg'

    const commentUsername = document.createElement('b')
    commentUsername.classList.add('author')
    commentUsername.textContent = commentData.username

    const commentTime = document.createElement('p')
    commentTime.classList.add('time')
    commentTime.textContent = commentData.time

    //수정버튼
    const modifyDiv = document.createElement('div')
    modifyDiv.classList.add('modify')
    const editButton = document.createElement('button')
    editButton.textContent = '수정'
    editButton.setAttribute('data-id', commentData.commentId)
    modifyDiv.appendChild(editButton)

    //삭제버튼
    const deleteDiv = document.createElement('div')
    deleteDiv.classList.add('delete')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = '삭제'
    deleteButton.setAttribute('data-id', commentData.commentId)
    deleteDiv.appendChild(deleteButton)

    commentInfoDiv.appendChild(profileImage)
    commentInfoDiv.appendChild(commentUsername)
    commentInfoDiv.appendChild(commentTime)
    commentInfoDiv.appendChild(modifyDiv)
    commentInfoDiv.appendChild(deleteDiv)

    const commentDiv = document.createElement('div')
    commentDiv.classList.add('comment')
    commentDiv.setAttribute('data-id', commentData.commentId)

    const commentContent = document.createElement('p')
    commentContent.classList.add('comment-content')
    commentContent.textContent = commentData.content
    commentDiv.appendChild(commentContent)

    commentsContainer.appendChild(commentInfoDiv)
    commentsContainer.appendChild(commentDiv)
}

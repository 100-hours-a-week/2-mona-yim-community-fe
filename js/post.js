import {
    postHelper,
    commentsHelper,
    postDeleteHelper,
    commentUploadHelper,
    commentReuploadHelper,
    commentDeleteHelper,
    likeHelper,
    unlikeHelper,
    likeStatus,
} from '../request/postsRequest.js'

import { myUrl } from './initialize.js'

import { userHelper } from '../request/loginRequest.js'

import { formatDate } from '../utils/function.js'

import { initializeDropdown, initializeProfile } from './initialize.js'

document.addEventListener('DOMContentLoaded', fetchPostInfo)
document.getElementById('comment-text').addEventListener('input', handleComment)
document
    .getElementById('comment-upload')
    .addEventListener('click', handleCommentUpload)
document.getElementById('cancel').addEventListener('click', handleCancelModal)
document.getElementById('confirm').addEventListener('click', handleConfirmModal)
document.getElementById('likes').addEventListener('click', handleLike)

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
        commentButton.style.backgroundColor = '#fd0072'
    } else {
        commentButton.style.backgroundColor = '#eaa7c5'
    }
}

async function handleCommentUpload() {
    const pathParts = window.location.pathname.split('/')
    const postId = Number(pathParts[pathParts.length - 1])
    const commentInput = document.getElementById('comment-text')
    const commentValue = commentInput.value
    const actionType = document.getElementById('comment-upload').dataset.action
    if (commentValue) {
        // 댓글 생성
        if (actionType === 'upload') {
            if (!localStorage.getItem('userId')) {
                alert('😻: 로그인이 필요합니다')
            } else {
                const response = await commentUploadHelper(
                    postId,
                    formatDate(),
                    commentValue
                )
            }
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
    for (const commentData of responseCommentArray) {
        await createComment(commentData)
    }
}

async function createPost(postData) {
    const userData = await userHelper(postData.userId)

    const editButton = document.getElementById('edit-button')
    const deleteButton = document.getElementById('delete-button')

    document.querySelector('.info .author').textContent = userData.username
    document.getElementById('userProfileImage').src = userData.profileImage
        ? `${myUrl}/images/${userData.profileImage}`
        : '/assets/profile_image.jpg'
    document.querySelector('.title h2').textContent = postData.title

    if (Number(localStorage.getItem('userId')) === postData.userId) {
        const infoDiv = document.querySelector('.info')

        // 수정 버튼 생성
        const modifyDiv = document.createElement('div')
        modifyDiv.className = 'modify'

        const editButton = document.createElement('button')
        editButton.id = 'edit-button'
        editButton.textContent = '수정'
        modifyDiv.appendChild(editButton)

        // 삭제 버튼 생성
        const deleteDiv = document.createElement('div')
        deleteDiv.className = 'delete'

        const deleteButton = document.createElement('button')
        deleteButton.id = 'delete-button'
        deleteButton.textContent = '삭제'
        deleteDiv.appendChild(deleteButton)

        // 생성한 버튼을 infoDiv에 추가
        infoDiv.appendChild(modifyDiv)
        infoDiv.appendChild(deleteDiv)

        editButton.addEventListener('click', handleEdit)
        deleteButton.addEventListener('click', handleDelete)
    }

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

    document.querySelector('.info .time').textContent = formattedDate
    document.querySelector('.contents img').src = postData.postImage
        ? `${myUrl}/images/${postData.postImage}`
        : ''
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

async function createComment(commentData) {
    const userData = await userHelper(commentData.userId)
    const commentsContainer = document.querySelector('.comments')

    const commentInfoDiv = document.createElement('div')
    commentInfoDiv.classList.add('comment-info')

    const profileImage = document.createElement('img')
    profileImage.classList.add('profile')
    profileImage.src = userData.profileImage
        ? `${myUrl}/images/${userData.profileImage}`
        : '/assets/profile_image.jpg'

    const commentUsername = document.createElement('b')
    commentUsername.classList.add('author')
    commentUsername.textContent = userData.username

    const commentTime = document.createElement('p')
    commentTime.classList.add('time')
    const date = new Date(commentData.time)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    commentTime.textContent = formattedDate

    commentInfoDiv.appendChild(profileImage)
    commentInfoDiv.appendChild(commentUsername)
    commentInfoDiv.appendChild(commentTime)

    if (Number(localStorage.getItem('userId')) === commentData.userId) {
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

        commentInfoDiv.appendChild(modifyDiv)
        commentInfoDiv.appendChild(deleteDiv)
    }

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

async function handleLike() {
    if (!localStorage.getItem('userId')) {
        alert('😻: 로그인이 필요합니다.')
    } else {
        const pathParts = window.location.pathname.split('/')
        const postId = Number(pathParts[pathParts.length - 1])

        const statusResponse = await likeStatus(postId)
        let response
        if (statusResponse.liked) {
            response = await unlikeHelper(postId)
        } else {
            response = await likeHelper(postId)
        }
        document.getElementById('likes').innerHTML = `${formatCount(
            response.likes
        )} <br />좋아요수`
    }
}

initializeProfile()
initializeDropdown()

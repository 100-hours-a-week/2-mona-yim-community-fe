import { postHelper, commentsHelper } from '../api/postsRequest.js'

document.addEventListener('DOMContentLoaded', fetchPostInfo)
document.getElementById('edit-button').addEventListener('click', handleEdit)
document.getElementById('delete-button').addEventListener('click', handleDelete)
document.getElementById('comment-text').addEventListener('input', handleComment)
document.getElementById('cancel').addEventListener('click', handleCancelModal)
document.getElementById('confirm').addEventListener('click', handleConfirmModal)

function handleEdit() {
    window.location.href = '/edit_post'
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

function formatCount(count) {
    if (count >= 1000) {
        const formattedCount = Math.floor(count / 1000) + 'k'
        return formattedCount
    }
    return count
}

document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', (event) => {
        const commentContainer =
            event.target.closest('.comment-info').nextElementSibling
        const commentText =
            commentContainer.querySelector('.comment-content').textContent

        // .textContent 대신 .value 사용
        document.getElementById('comment-text').value = commentText
        document.getElementById('comment-upload').textContent = '댓글 수정'
    })
})

document.querySelectorAll('.delete-comment').forEach((button) => {
    button.addEventListener('click', (event) => {
        const modal = document.getElementById('modal')
        const modalTitle = document.querySelector('#modal .modal-content h2')
        modalTitle.textContent = '댓글을 삭제하시겠습니까?'
        document.body.style.overflow = 'hidden'
        modal.style.display = 'flex'
    })
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

function handleConfirmModal() {
    // 확인 버튼 클릭 시 동작 (추가 구현 가능)
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
    console.log(commentData)
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
    modifyDiv.appendChild(editButton)

    //삭제버튼
    const deleteDiv = document.createElement('div')
    deleteDiv.classList.add('delete')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = '삭제'
    deleteDiv.appendChild(deleteButton)

    commentInfoDiv.appendChild(profileImage)
    commentInfoDiv.appendChild(commentUsername)
    commentInfoDiv.appendChild(commentTime)
    commentInfoDiv.appendChild(modifyDiv)
    commentInfoDiv.appendChild(deleteDiv)

    const commentDiv = document.createElement('div')
    commentDiv.classList.add('comment')

    const commentContent = document.createElement('p')
    commentContent.classList.add('comment-content')
    commentContent.textContent = commentData.content
    commentDiv.appendChild(commentContent)

    commentsContainer.appendChild(commentInfoDiv)
    commentsContainer.appendChild(commentDiv)
}

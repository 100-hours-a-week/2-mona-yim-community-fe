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

function formatCount() {
    const countElements = document.querySelectorAll('.count')

    countElements.forEach((element) => {
        const countText = element.textContent.split(' ')[0] // 숫자 부분 추출
        const labelText = element.textContent.split(' ')[1] // "좋아요수" 등의 텍스트 부분 추출
        const count = parseInt(countText, 10) // 숫자로 변환
        if (count >= 1000) {
            const formattedCount = Math.floor(count / 1000) + 'k'
            element.innerHTML = `${formattedCount} <br />${labelText}`
        }
    })
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

formatCount()

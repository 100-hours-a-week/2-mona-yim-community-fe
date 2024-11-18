import { postUploadHelper } from '../api/postsRequest.js'
import { formatDate } from '../utils/function.js'

document.getElementById('subject').addEventListener('input', handleSubmit)
document.getElementById('content').addEventListener('input', handleSubmit)
document.getElementById('submit').addEventListener('click', handleSubmit)

async function handleSubmit(event) {
    const subjectInput = document.getElementById('subject')
    const subjectValue = subjectInput.value
    const contentInput = document.getElementById('content')
    const contentValue = contentInput.value
    const submitButton = document.getElementById('submit')
    const postImageInput = document.getElementById('post_image')
    const postImageValue = postImageInput.files[0]

    if (subjectValue && contentValue) {
        submitButton.style.backgroundColor = '#7F6AEE'
    } else {
        submitButton.style.backgroundColor = '#ACA0EB'
    }

    if (event.type == 'click') {
        if (!subjectValue || !contentValue) {
            document.getElementById('helper-submit').textContent =
                '*제목, 내용을 모두 작성해주세요'
        } else {
            const postData = {
                title: subjectValue,
                userId: 1,
                time: formatDate(),
                postImage: postImageValue,
                postContent: contentValue,
            }
            const response = await postUploadHelper(postData)
            window.location.href = '/posts'
        }
    }
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

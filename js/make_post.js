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
                username: '',
                time: formatDate(),
                postImage: postImageValue,
                postContent: contentValue,
            }
            const response = await postUploadHelper(postData)
            window.location.href = '/posts'
        }
    }
}

document.getElementById('create').addEventListener('mouseover', handleHover)
document.getElementById('create').addEventListener('mouseout', handleUnhover)
document.getElementById('create').addEventListener('click', handleCreate)

function handleHover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#7F6AEE'
}

function handleUnhover() {
    const createButton = document.getElementById('create')
    createButton.style.backgroundColor = '#ACA0EB'
}

function handleCreate() {
    window.location.href = '/make_post'
}

function formatCount() {
    const countElements = document.querySelectorAll('.info p')

    countElements.forEach((element) => {
        const labelText = element.textContent.split(' ')[0] // 숫자 부분 추출
        const countText = element.textContent.split(' ')[1] // "좋아요수" 등의 텍스트 부분 추출
        const count = parseInt(countText, 10) // 숫자로 변환
        if (count >= 1000) {
            const formattedCount = Math.floor(count / 1000) + 'k'
            element.innerHTML = `${formattedCount} <br />${labelText}`
        }
    })
}

formatCount()

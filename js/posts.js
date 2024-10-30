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
    window.location.href = '/2-mona-yim-community-fe/templates/make_post.html'
}

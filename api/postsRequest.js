export const postsHelper = async () => {
    const result = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    return result
}

export const postHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

export const commentsHelper = async (postId) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const commentUploadHelper = async (postId, commentData) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        }
    )
    return result
}

export const commentReuploadHelper = async (postId, commentId, commentData) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        }
    )
    return result
}

export const commentDeleteHelper = async (postId, commentId) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const postUploadHelper = async (postData) => {
    const formData = new FormData()

    formData.append('title', postData.title)
    formData.append('userId', postData.userId)
    formData.append('time', postData.time)
    formData.append('likes', 0)
    formData.append('comments', 0)
    formData.append('views', 0)
    if (postData.postImage) {
        formData.append('postImage', postData.postImage) // 파일 추가
    }
    formData.append('postContent', postData.postContent)

    const result = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: formData,
    })

    return result
}

export const reUploadHelper = async (postId, title, postContent, postImage) => {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('postContent', postContent)
    if (postData.postImage) {
        formData.append('postImage', postImage) // 파일 추가
    }

    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        body: formData,
    })
    return result
}

export const postDeleteHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

export const likeStatus = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result.json()
}

export const likeHelper = async (likeData) => {
    const result = await fetch(
        `http://localhost:3000/posts/${likeData.postId}/like`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likeData),
        }
    )
    return result.json()
}

export const unlikeHelper = async (likeData) => {
    const result = await fetch(
        `http://localhost:3000/posts/${likeData.postId}/unlike`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likeData),
        }
    )
    return result.json()
}

export const postsHelper = async () => {
    const result = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

export const postHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'GET',
        credentials: 'include',
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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const commentUploadHelper = async (postId, time, content) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: postId,
                userId: 0,
                time: time,
                content: content,
            }),
        }
    )
    return result
}

export const commentReuploadHelper = async (postId, commentId, commentData) => {
    const result = await fetch(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
            method: 'PATCH',
            credentials: 'include',
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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const postUploadHelper = async (title, time, postImage, postContent) => {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('userId', 0)
    formData.append('time', time)
    formData.append('likes', 0)
    formData.append('comments', 0)
    formData.append('views', 0)

    if (postImage) {
        formData.append('postImage', postImage) // 파일 추가
    }
    formData.append('postContent', postContent)

    const result = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include',
        body: formData,
    })
    return result
}

export const postDeleteHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result
}

export const likeStatus = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result.json()
}

export const likeHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result.json()
}

export const unlikeHelper = async (postId) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}/unlike`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return result.json()
}

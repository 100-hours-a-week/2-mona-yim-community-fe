export const postsHelper = async () => {
    const result = await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
    const result = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    return result
}

export const reUploadHelper = async (postId, postData) => {
    const result = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
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

export const postsHelper = async () => {
    const result = await fetch(
        // test server
        'https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/posts',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const postHelper = async (postId) => {
    const result = await fetch(
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/posts/${postId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const commentsHelper = async (postId) => {
    const result = await fetch(
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/posts/${postId}/comments`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return result
}

export const postUploadHelper = async (postData) => {
    const result = await fetch(
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/posts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }
    )
    return result
}

export const reUploadHelper = async (postId, postData) => {
    const result = await fetch(
        `https://49b079ca-d797-4d96-a59e-bcb0f7741967.mock.pstmn.io/posts/${postId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        }
    )
    return result
}

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 4000

// static page
app.use('/styles', express.static(path.join(__dirname, 'styles')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/utils', express.static(path.join(__dirname, 'utils')))
app.use('/api', express.static(path.join(__dirname, 'api')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'login.html'))
})

app.get('/edit_password', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'edit_password.html'))
})

app.get('/edit_post', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'edit_post.html'))
})

app.get('/edit_profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'edit_profile.html'))
})

app.get('/make_post', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'make_post.html'))
})

app.get('/posts/:id', (req, res) => {
    const postId = req.params.id
    res.sendFile(path.join(__dirname, 'templates', 'post.html'))
})

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'posts.html'))
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'signin.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

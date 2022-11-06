const app = require("../app")
const { dbConnect, dbDisconnect, dbCleanUP } = require("./test-utils/db.utils")
const request = require("supertest")

const userModel = require("../models/user")
const postModel = require("../models/blog")

const user = {
    firstname: "Ade",
    lastname: "Obe",
    username: "samzy",
    email: "testing@test.com",
    password: "dummyPassword"
}

const post_data = {
    title: 'Dummy post title',
    description: 'Post description',
    author: 'skyreal',
    tags: ['random', 'irrelevant', 'testing'],
    body: "okay, so i'm just testing this out, this is a meaningless body",
    // owner: 'unknown'

}

describe('Test post routes', () => {
    let token;
    let owner;

    beforeAll(async () => {
        dbConnect()
    })

    beforeEach(async () => {
        const createdUser = await userModel.create(user)
        owner = createdUser.id

        const login = await request(app).post("/users/login")
            .send({ identity: user.username, password: user.password })
        token = login.body.token
    })

    afterEach(async () => {
        await dbCleanUP()
    })

    afterAll(async () => {
        await dbDisconnect()
    })

    it('should create a post', async () => {
        post_data.owner = owner
        const response = await request(app).post('/blogs')
            .set('content-type', 'application/json')
            .set('authorization', `Bearer ${token}`)
            .send(post_data)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("blog")
        expect(response.body.blog).toHaveProperty("reading_time", 1)
        expect(response.body.blog).toHaveProperty("state", "draft")
    })


    it('should get all published post', async () => {
        post_data.owner = owner
        post_data.state = "published"
        await postModel.create(post_data)
        const response = await request(app).get('/blogs')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('posts')
        for (let post of response.body.posts) {
            expect(post).toHaveProperty("state", "published")
        }
    })

    it('should get single post', async () => {
        post_data.owner = owner

        const post = await postModel.create(post_data)
        const response = await request(app).get(`/blogs/${post.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("post")
        expect(response.body.post).toHaveProperty("owner")
        expect(response.body.post.owner).toHaveProperty("username")
    })

    it('should update post state', async () => {
        post_data.owner = owner
        const post = await postModel.create(post_data)
        const response = await request(app).put(`/blogs/state/${post.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({ state: 'published' })

        expect(response.status).toBe(200)
        expect(response.body.post).toHaveProperty("state", "published")
    })

    it('should update post body', async () => {
        post_data.owner = owner
        const post = await postModel.create(post_data)
        const response = await request(app).put(`/blogs/${post.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'updated title' })
        expect(response.status).toBe(200)
        expect(response.body.post.title).toBe("updated title")
    })

    it('should delete a post', async () => {
        post_data.owner = owner
        const post = await postModel.create(post_data)
        const response = await request(app).delete(`/blogs/${post.id}`)
            .set('authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})


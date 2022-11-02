const request = require("supertest")
const userModel = require("../models/user")
const app = require("../app")
const { dbConnect, dbDisconnect, dbCleanUP } = require("./test-utils/db.utils")

const data = {
    firstname: "Ade",
    lastname: "Obe",
    username: "samzy",
    email: "testing@gmail.com",
    password: "dummyPassword"
}

beforeAll(async () => {
    await dbConnect()
})

afterEach(async () => {
    await dbCleanUP()
})

afterAll(async () => {
    await dbDisconnect()
})

describe('Sign up user', () => {
    it('should validate successfuly sign up', async () => {
        const response = await request(app).post('/users')
            .set("content-type", "application/json")
            .send(data)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("user")
        expect(response.body.user).toHaveProperty("firstname", "Ade")
        expect(response.body.user).toHaveProperty("username", "samzy")
        expect(response.body.user).toHaveProperty("email", "testing@gmail.com")
    });

    test('Unsuccessful login', async () => {
        let response = await request(app).post('/users/login')
            .set('content-type', 'application/json').send({ username: 'samzy', password: 'dummyPassword' })

        expect(response.status).toBe(401)
    })

    test('Successful Login', async () => {
        const newUser = data
        await userModel.create(newUser)
        let response = await request(app).post('/users/login')
            .set('content-type', 'application/json')
            .send({ identity: 'samzy', password: 'dummyPassword' })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')


    })
})


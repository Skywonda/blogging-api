# Blog api
This is an api for a blog app

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get posts
5. Users should be able to create post
6. Users should be able to update and delete post
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev` or
- rum `npm start`

---
## Base URL
- https://skyreal-blog-app.cyclic.app/

- Additonal feature
    - Frontend url
    - https://blog-app-flame.vercel.app/
    - Under construction, not yet completed!


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  email     | string  |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  password |   string |  required  |



### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title     | string  |  required, unique|
|  description |   string |  optional  |
|  tags | array | optional |
|  author | string | optional
|  read_count | number, default: 0 | required
|  reading_time | number | required |
|  owner | `Mongoose ObjectId` | required! | 
|  body  |  string |  required  |
|  state | enum[`published`, `draft`]  |  required, default:`draft`|



## APIs
---

### Signup User

- Route: / users
- Method: POST
- Body: 
```
{
    firstname: "jon",
    lastname: "doe",
    username: 'jon_doe",
    email: "doe@example.com",
    password: "Password1",
}
```

- Responses

Success
```
{
    message: 'User Created',
    user: {
        id: "6361bec5c0.....",

        firstname: "jon",

        lastname: "doe",

        username: 'jon_doe",

        email: "doe@example.com",

        password: "$argon2id$v=19$m=65536...."

        created_at: `timestamps`,

        updated_at: `timestamps`
    }
}
```
---
### Login User

- Route: /users/login
- Method: POST
- Body: 
```
{
  username: 'jon_doe", 
or email : "doe@example.com"

  password: "Password1",
}
```

- Responses

Success
```
{
    message: 'Login successful!',
    token: 'eyJhbGciOiJIUzI1NiIsInR5....'
}
```

---
### Create Post

- Route: /blogs
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    title: "The dummy title",

    tags: ["random", "testing"],

    description: "This is the post description",

    body : "This is a post body, okay you can add whatever you want, i would handle it!"
}
```

- Responses

Success
```
msg: "Blog created successfully!",

blog: {
    title: "This dummy title",

    tags: ["random", "testing"],

    description: "This is the post 
    description",

    read_count : 0,

    reading_time: 1,

    body : "This is a post body, okay you can add whatever you want, i would handle it!",

    state : "draft",

    created_at: `timestamps`,

    updated_at `timestamps`
}
```
---
### Get Post

- Route: /blog/:id
- Method: GET
- Responses

Success
```
msg: "A single post",
post: {
    title: "This dummy title",

    tags: ["random", "testing"],

    description: "This is the post description",

    read_count : 0,

    reading_time: 1,

    body : "This is a post body, okay you can add whatever you want, i would handle it!",

    state : "draft",

    owner: {
        id: "6361bec5c0.....",
        firstname: "jon",
        lastname: "doe",
        username: 'jon_doe",
        email: "doe@example.com",
        created_at: `timestamps`,
        updated_at: `timestamps`
    }

    created_at: `timestamps`,
    updated_at `timestamps`
}
```
---

### Get Posts

- Route: /orders
- Method: GET
- Query params: 
    - page (default: 1)
    - limit (default: 10)
    - sort ([readcount, timestamps, reading_time], default: read_count)
    - state: published
- Responses

Success
```
{
    msg: "found!",
	posts: [
		{
			_id: 6362ff510....,

			title: "Why photograph equipment is the new black",

			description: "How to start using photography services",

			tags: [
				"Photography",
				"Photo",
				"Awards",
				"Sense",
				"Art",
				"Lighting",
				"random"
			],

			read_count: 7077,

			reading_time: 3,

			body: "The evolution of engagement photos. Expose: you're losing money by not using photography services. How photo awards can help you live a better life. The 10 best photograph equipment twitter feeds to follow.....",

			owner: "6361bec5c....",
			state: "published",
			createdAt: "2022-11-02T23:37:53.677Z",
			updatedAt: "2022-11-05T09:12:06.745Z",
}
```
---

### List Authors Post
- Route: /blogs/author
- Method: GET
- Header: 
    - authorization: Bearer token

- Query Param: 
    - State (default: published)
    - Limit (default: 10)
    - Page (default: 1)

- Description: Returns all post from a single author.

---

### Update post state
- Route : /blogs/state/:id
- Method : PUT
- Header: 
    - authorization: Bearer token
- Description: Owner can switch from draft state to published and vice versa
- Body: 
```
    {
        "state": "published"
    }

```

- Success Response: 

```
    msg: "Post state updated successfully!",
    
    post: {
        ...

        state: "published"
    }
```
---

### Update post body
- Route : /blogs/:id
- Method: PUT
- Header: 
    - authorization : Bearer token
- Description: Post owner can update post body
- Body: 
```
    {
        "title": "updated title",
        "body" : "This is a new body",
    }
```
- Success Response
```
    {
        "title" : "updated title",
        "body": "This is a new body",
        "description" ...
    }
```

---

### Delete Post

- Route: /blogs/:id
- Method: DELETE
- Header : 
    - authorization: Bearer token

- Description: Post owners can delete thier own post

- Success Response:

```
    msg: "Deleted Successfully",
```



...

## Creator
- Oluwadamilola Ajayi
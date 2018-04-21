# Running the project

```
#install packages
npm install

#run mongoDB
mongod

#if installed with homebrew you might need to specify path
mongod --dbpath /usr/local/var/mongodb

#run the server
node server.js
```

## API Documentation

### Story Routes

**/api/stories**
- [GET] *lists all stories*
    - query: `page=n` (default 0), `limit=n` (default 50)
    - [200] Array of stories (newest first)
    - [500] body: { message: <error-message> }
- [POST] *create story*
    - params:
        - body (body of story) *required*
        - author (username) *required*
        - authorId *required*
        - parent *optional*
    - [200] Story object
    - [401] { message: 'Story is invalid and therefore cannot be posted' }
    - [500] { message: <error-message> }

**/api/stories/:userId**
- [GET] *return the stories of a specific user*
    - query: `userId` *required*
    - [200] Array of stories (newest first)
    - [400] { message: 'User does not exist' }
    - [500] { message: <error-message> }

**/api/story/:storyId**
- [GET] *returns the story object requested*
    - query: `storyId` *required*
    - [200] Story Object
    - [404] { message: `Story with id ${req.params.storyId} not found` } }
    - [500] { message: <error-message> }
- [PUT] *update story*
- [DELETE] *delete story*

**/api/children/:storyId**
- [GET] *returns the list of child story objects*

**/api/parents/:storyId**
- [GET] *returns the list of parent objects to the top level node*

**/api/like/:storyID**
- [POST] *allows user to toggle 'like' on a story*

### User Routes

**/api/users**
- [GET] *returns a list of all users*
    - [200] list of users
    - [500] { message: <error-message> }
- [POST] *create new user*
    - params: 
        - username *required*
        - email *required*
        - password *required*
        - firstName *optional*
        - lastName *optional*
        - profileImg *optional*
    - [200] auth cookie set, { username:..., _id:... }
    - [401] { message: 'Email already in use.' }, { message: 'Username already exists.' }
    - [500] { message: <error-message> }

**/api/user/:userId**
- [GET] *return user object (profile)*
    - [200] auth cookie set, { username:..., _id:... }
    - [404] { message: "User account not found." }
    - [500] { message: <error-message> }
- [PUT] *update user object*

**/api/login**
- [GET] *check token validity for remembered sign-on*
- [POST] *user login*
    - [200] auth cookie set, { username:..., _id:... }
    - [401] { message: "Username or password incorrect." }
    - [404] { message: "User account not found." }
    - [500] { message: <error-message> }

**/api/logout**
- [POST] *removes users authentication token to logout*
    - [200] auth cookie removed
    - [404] { message: "User account not found." }
    - [500] { message: <error-message> }

**/api/follow/:userId**
- [POST] *allow user to follow other user*
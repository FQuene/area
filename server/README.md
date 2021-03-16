# Area Documentation - REST API

Description

# Application API

`GET /`  
Ping the server

**Response**

    OK: Welcome to the AREA API ! 📦

# Users API

`GET /users/all`

Retrieve list of all users present in the database

**Response**

    OK: [{Users}]

---

`POST /users/create-area`  
Add an area in the database

**Headers**

    Authorization - Bearer token - Required

**Body**

    actionService: string;
    actionDes: string;
    actionId: string;
    actionParams: any;
    reactionService: string;
    reactionDes: string;
    reactionId: string;
    reactionParams;

**Response**

    OK: area has been created + {area}
    ERROR: HttpStatus.INTERNAL_SERVER_ERROR

---

`GET /users/areas`  
Retrieve all areas of an user

**Headers**

    Authorization - Bearer token - Required

**Response**

    OK: [{areas}]

---

`DELETE /users/delete-area/:id`  
Delete an area with a specific id

**Headers**

    Authorization - Bearer token - Required

**Request params**

    id

**Response**

    OK: HttpStatus.CREATED
    ERROR: HttpStatus.CONFLICT

---

`POST /users/add-token`  
Add a new OAUTH token

**Headers**

    Authorization - Bearer token - Required

**Body**

    token: string;
    params: string;
    service: string;

**Response**

    OK: HttpStatus.CREATED
    ERROR: HttpStatus.CONFLICT

---

`GET /users/get-tokens-status`  
Retrieve all tokens of a user

**Headers**

    Authorization - Bearer token - Required

**Response**

    OK: [{tokens}]
    ERROR: HttpStatus.CONFLICT

---

`DELETE /users/reset-token/:id`  
Reset token with a specific id

**Headers**

    Authorization - Bearer token - Required

**Request params**

    id

**Response**

    OK: {token}
    ERROR: HttpStatus.CONFLICT

---

`POST /users/area-on-off`  
Reset token with a specific id

**Headers**

    Authorization - Bearer token - Required

**Body**

    areaId: int;
    status: bool;

**Response**

    OK: 200

# Auth API

`POST /auth/login`  
Login user

**Body**

    email: string;
    password: string;

**Response**

    OK: {user}

---

`POST /auth/register`  
Register user

**Body**

    username: string;
    email: string;
    password: string;
    accType: string;

**Response**

    OK: HttpStatus.CREATED
    ERROR: HttpStatus.CONFLICT

---

`GET /auth/profile`  
Retrieve user profile

**Headers**

    Authorization - Bearer token - Required

**Response**

    OK: {user}

---

`GET /auth/google`  
OAUTH with google

---

`GET /auth/google/redirect`  
Google OAUTH redirect link

**Response**

    OK: redirect

---

`GET /auth/twitch`  
OAUTH with twitch

---

`GET /auth/twitch/redirect`  
Twitch OAUTH redirect link

**Response**

    OK: redirect

---

`GET /auth/spotify`  
OAUTH with spotify

---

`GET /auth/spotify/redirect`  
Spotify OAUTH redirect link

**Response**

    OK: redirect

#### Setup

```bash
npm install && npm start
```

#### Database Connection

You'll also need to setup a .env file in the root directory with the following:

1. MONGO_URI - Get this from mongoDB Atlas cloud platform
2. JWT_SECRET - An encrypted string (more complex the better)
3. JWT_LIFETIME - foe ex: 30d

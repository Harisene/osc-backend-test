### Open Study College Backend Test

Please follow the below steps to run the project on local environment.

**1. Clone the project**

```
git clone https://github.com/Harisene/osc-backend-test.git
```

**2. Setup environment variables**

Create a `.env` file in the root of the project and add below variables.

```
DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA_NAME>"
TOKEN_SECRET=<SECRET> // uses to generate JWT token
```

**3. Install dependencies**

```
npm install or yarn install
```

**4. Create database and tables**
First of all make sure the postgres database server is up and running. Run below command to create database and tables.

```
npx prisma migrate dev
```

**5. Start server**

```
npm run dev
```

**6. Test**
Now you can start working with the server. Go to http://localhost:3000/graphql for Graphql GUI.

### Special Notes

- Some of the mutations are protected. Therefore, need to pass user token in the header with the request as shown below. Protected mutations are listed below.

```
authorization: "Bearer <token>"
```

**Protected Mutations**

    addCollection
    addCourse
    updateCourse
    deleteCourse
    updateUser

- Some of the mutations have role base authorization. Check below list for role based mutations.

      addCollection ["Admin"]
      addCourse ["Admin", "Author"]
      updateCourse ["Admin", "Author"]
      deleteCourse ["Admin", "Author"]
      updateUser ["Admin"] // can update only role

### Open Study College Backend Test

Please follow the below steps to run the project in the local environment.

**1. Clone the project**

```
git clone https://github.com/Harisene/osc-backend-test.git
```

**2. Setup environment variables**

Create a `.env` file in the root of the project and add the variables below.

```
DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA_NAME>"
TOKEN_SECRET=<SECRET> // uses to generate JWT token
```

**3. Install dependencies**

```
npm install or yarn install
```

**4. Create database and tables**
First of all make sure the Postgres database server is up and running. Run the below command to create a database and tables.

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

- There are three roles for a user. Admin or Author or Student.
- Courses can be updated or deleted by the course author and admin only. An author  can't update or delete someone else's courses.
- Collections can be added by admins only.
- getCollections resolver has a caching mechanism for efficiency.
- Some of the mutations are protected. Therefore, need to pass the user token in the header with the request as shown below. Protected mutations are listed below.

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

### Demo

https://drive.google.com/file/d/1CrEfx_dsrPht1T14PakqL137GGWsNB5H/view?usp=sharing

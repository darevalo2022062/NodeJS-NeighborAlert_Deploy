  

# Neighbor Alert API Documentation

This project aims to develop a web application using Node.js, React, and MongoDB to address the problem of managing community reports. The application serves as a centralized platform where members of a community, such as those in a neighborhood, residential area, or municipality, can submit and manage reports on various local issues. These reports can range from infrastructure problems like damaged streets to requests for community support and assistance. The system includes three main roles—administrative, community manager, and user—each with specific functionalities to ensue efficient handling and resolution of reports.

> **Easy** solution, **happy** community. 
> only with us... `Neighbor Alert API`
> 
> ![enter image description here](https://i.ibb.co/fvZBC73/Logo.png)

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [Authentication](#authentication)
3. [Administration Functions](#administration-functions)
    - [Manager Management](#manager-management)
    - [Platform Administration](#platform-administration)
4. [Manager Functions](#manager-functions)
    - [Community Management](#community-management)
    - [Reports Management](#reports-management)
    - [Users Management](#users-management)
5. [User Functions](#user-functions)
    - [Community Management](#community-management-1)
    - [Reports Management](#reports-management-1)
    - [User Management](#user-management)
6. [API Endpoints](#api-endpoints)
7. [Error Handling](#error-handling)
8. [Security](#security)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)
12. [Thanks](#thanks)


## Setup and Installation

1. Clone the repository

2. Install dependencies:
```
nmp i
```

4. Set up environment variables:
Create a `.env` file in the root directory and define the following variables:
`NODE_ENV`, `PORT`, `JWT_SECRET`, `MONGODB_URI`

1. Import sample data to MongoDB:
Import the sample data provided in `configs/data` into your MongoDB database.

1. Run the server:
```
  npm run dev
```
## Authentication

The API uses JSON Web Tokens (JWT) for user authentication. Upon successful login, a JWT is generated and included in subsequent requests to authenticate the user.

To authenticate, send a POST request to `/api/auth/login` with the user's credentials. Upon successful authentication, the server responds with a JWT token.

## Administration Functions
### Manager Management
 -  Create Manager accounts.
-   Delete Manager accounts.

### Platform Administration:

-   Maintenance and supervision.
-   View and delete Communities.

## Manager Functions

### Community Management
  
 - Create, edit, view, and delete their community.
 
### Reports Management
  -   View and delete Reports.
  -   Validate and change report status.

### Users Management
   -   View and delete Users in their community.

## User Functions
### Community  Management
- Unlink from Community.
-  Link to a new community.

### Reports Management
-   View reports within their community.
-   Submit reports publicly.
-   Eliminate and edit my public reports
-   Submit reports anonymously.

### User Management
- My user settings
- Delete the account

## API Endpoints

- **POST /api/auth/login**: Authenticate user and generate JWT token.
- **POST /api/auth/register**: Add a new User.
- **GET /api/users**: Get all users.
- **GET /api/users/:id**: Get user details.
- **PUT /api/users/:id**: Update user details.
- **DELETE /api/users/:id**: Delete a user.
- *More endpoints for accounts, transactions, products, and favorites.*

## Error Handling

The API provides descriptive error messages and appropriate HTTP status codes for various scenarios, such as invalid requests, authentication failures, and server errors.

## Security

- Use JWT for user authentication and authorization.
- Implement input validation and sanitize user input to prevent injection attacks.
- Use HTTPS to secure data transmission between client and server.

## Deployment

Deploy the API to a cloud platform such as Heroku, AWS, or Azure for public access.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Thanks

I hope you enjoy the project. Thanks for watching.



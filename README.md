# Contact Management CRUD App

A full-stack contact management application with Spring Boot backend and React frontend.

## Features

- Store contact name and phone number
- Full CRUD operations: Create, Read, Update, Delete
- REST API endpoints
- In-memory H2 database

## Backend (Spring Boot)

### Endpoints

- `GET /contacts` - Get all contacts
- `POST /contacts` - Create a new contact
- `GET /contacts/{id}` - Get contact by ID
- `PUT /contacts/{id}` - Update contact by ID
- `DELETE /contacts/{id}` - Delete contact by ID

### Running the Backend

1. Navigate to the `backend` directory
2. Run `mvn spring-boot:run`
3. The server will start on `http://localhost:8080`

## Frontend (React)

### Running the Frontend

1. Navigate to the `frontend` directory
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## Technologies Used

- Backend: Spring Boot, JPA, H2 Database
- Frontend: React, JavaScript

# Sign Up Form – Full Stack Web Application

A full-stack Sign Up Form application developed using React, Spring Boot, and MariaDB. The application allows users to register by entering their personal details, validates the submitted information on both the frontend and backend, verifies the pincode against a database of valid Indian pincodes, stores the registration details in the database, and displays a registration confirmation page after successful registration.

## Features

* Sign Up Form
* First Name validation – alphabets only
* Last Name validation – alphabets only
* Email format validation
* Phone number validation

  * Supports phone numbers with or without `+`
  * Exactly 13 digits when `+` is used
  * Exactly 10 digits when `+` is not used
  * Phone number cannot start with `0`
* Password validation

  * Minimum 6 characters
  * At least one alphabet
  * At least one number
  * At least one special character from `@ # $ & !`
* Repeat Password validation
* Pincode validation

  * Exactly 6 digits
  * Pincode checked against the pincode database
* Duplicate email validation
* REST API integration between frontend and backend
* User data stored in MariaDB/MySQL
* Registration confirmation page
* Confirmation page retrieves user details using GET API
* Responsive form interface using HTML and CSS

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* React Router DOM

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Maven
* Bean Validation

### Database

* MariaDB 10.4.32
* MySQL-compatible database
* phpMyAdmin / MySQL Workbench

### Development Tools

* IntelliJ IDEA
* Visual Studio Code
* XAMPP
* Git
* GitHub
* Java JDK 21
* Node.js and npm

## 📁 Project Structure

```text
📂 signup-project/
│
├── 📂 frontend/
│   └── 📂 signup-frontend/
│       ├── 📂 public/
│       ├── 📂 src/
│       │   ├── 📂 components/
│       │   ├── 📂 pages/
│       │   ├── 📜 App.jsx
│       │   ├── 📜 main.jsx
│       │   └── 📜 index.css
│       │
│       ├── 📜 package.json
│       ├── 📜 package-lock.json
│       └── 📜 vite.config.js
│
├── 📂 backend/
│   └── 📂 signup-backend/
│       ├── 📂 src/
│       │   └── 📂 main/
│       │       ├── 📂 java/
│       │       │   └── 📂 com/example/signupbackend/
│       │       │       ├── 📂 controller/
│       │       │       ├── 📂 dto/
│       │       │       ├── 📂 entity/
│       │       │       ├── 📂 repository/
│       │       │       └── 📂 service/
│       │       │
│       │       └── 📂 resources/
│       │           └── 📜 application.properties
│       │
│       └── 📜 pom.xml
│
├── 📂 database/
│   └── 📜 signup_db.sql
│
├── 📜 .gitignore
└── 📜 README.md
```

## 🔄 Application Flow

```text
User
  │
  ▼
React Sign Up Form
  │
  │ POST Request
  ▼
Spring Boot REST API
  │
  ├── Validate First Name
  ├── Validate Last Name
  ├── Validate Email
  ├── Validate Phone Number
  ├── Validate Password
  ├── Validate Repeat Password
  ├── Validate Pincode
  └── Check Duplicate Email
  │
  ▼
MariaDB Database
  │
  ├── users
  └── pincodes
  │
  ▼
Registration Successful
  │
  ▼
Confirmation Page
  │
  │ GET Request
  ▼
Spring Boot REST API
  │
  ▼
Display Registered User Details
```

## ⚙️ Prerequisites

Install the following software before running the project:

### 1. Java JDK 21

- The backend is developed using Java 21.

- Verify the installation:

```bash
java -version
```

### 2. Node.js and npm

- Node.js is required to run the React frontend.

- Verify the installation:

```bash
node -v
npm -v
```

### 3. IntelliJ IDEA

IntelliJ IDEA is used to develop and run the Spring Boot backend.

### 4. Visual Studio Code

Visual Studio Code can be used to develop and run the React frontend.

### 5. XAMPP

XAMPP is used to run the local MariaDB database and phpMyAdmin.

Start:

```text
Apache
MySQL
```

from the XAMPP Control Panel.

### 6. Git

- Git is required to clone and manage the project.

- Verify the installation:

```bash
git --version
```

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vaishnavi-parodkar/signup-form-fullstack.git
```

Move into the project directory:

```bash
cd signup-form-fullstack
```

## 🗄️ Database Setup

### 2. Start XAMPP

Open XAMPP Control Panel and start:

```text
Apache
MySQL
```

### 3. Open phpMyAdmin

Open:

```text
http://localhost/phpmyadmin/
```

### 4. Create the Database

Create a database named:

```text
signup_db
```

### 5. Import the Database

Select:

```text
signup_db
```

Go to:

```text
Import → Choose File
```

Select:

```text
database/signup_db.sql
```

and import the file.

The database contains the required tables, including:

```text
users
pincodes
```

The `pincodes` table contains valid pincode data used during registration validation.

## 🔧 Backend Setup

### 6. Open the Backend

Open the following folder in IntelliJ IDEA:

```text
backend/signup-backend
```

### 7. Configure Database Connection

Open:

```text
backend/signup-backend/src/main/resources/application.properties
```

Configure the local MariaDB connection according to your MySQL/MariaDB setup.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/signup_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

If your MariaDB root user has a password, enter it in:

```properties
spring.datasource.password=YOUR_PASSWORD
```

Do not commit actual database passwords or other sensitive credentials to GitHub.

### 8. Start the Backend

The backend can be started from IntelliJ IDEA by running:

```text
SignupBackendApplication
```

or using Maven:

```bash
mvn spring-boot:run
```

The Spring Boot backend will run on:

```text
http://localhost:8080
```

## 💻 Frontend Setup

### 9. Open a New Terminal

Navigate to the frontend:

```bash
cd frontend/signup-frontend
```

### 10. Install Dependencies

Run:

```bash
npm install
```

This installs the required React and frontend dependencies from `package.json`.

### 11. Start the React Application

Run:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

Open the URL in your browser.

## 🔗 Frontend and Backend Connection

The React frontend communicates with the Spring Boot backend through REST APIs.

### Registration

The Sign Up page sends the registration data using a POST request:

```text
POST http://localhost:8080/api/users/register
```

The backend validates the data and stores the user in the `users` table.

### Registration Confirmation

- After successful registration, the user is redirected to the confirmation page.

- The confirmation page retrieves the registered user's details using:

```text
GET http://localhost:8080/api/users/{id}
```

The returned details are displayed on the Registration Successful page.

## 🗃️ Database

The application uses the following main tables:

### users

Stores registered user information.

```text
id
first_name
last_name
email
phone
password
pincode
```

### pincodes

Stores valid pincodes used to validate the pincode entered during registration.

```text
id
pincode
```

The pincode entered by the user is checked against the `pincodes` table before the registration is saved.

## 🧪 Running the Complete Application

Follow these steps in order:

```text
1. Start XAMPP
        ↓
2. Start MySQL
        ↓
3. Make sure signup_db exists
        ↓
4. Import signup_db.sql if required
        ↓
5. Start Spring Boot Backend
        ↓
6. Backend runs on port 8080
        ↓
7. Open frontend folder
        ↓
8. Run npm install
        ↓
9. Run npm run dev
        ↓
10. Open http://localhost:5173
```

The application is now ready to use.

## 📸 Screenshots

### Sign Up Page

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/9d3b6f2c-3237-4bf7-ab94-aac03d95ee0b" />

### Registration Successful Page

<img width="600" height="356" alt="image" src="https://github.com/user-attachments/assets/226bf6b1-8ec0-48c3-9b43-488a52aaef50" />

## 🔒 Security Note

- This project is developed as an educational application. For demonstration purposes, the password is currently stored directly in the database.

- For a production application, passwords should **never be stored as plain text**. A secure password hashing mechanism such as BCrypt should be implemented before deploying the application to a production environment.

- Database credentials should also be stored using environment variables or another secure configuration mechanism rather than committing them to GitHub.

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

## 📬 Contact

**Vaishnavi Parodkar**

📧 Email: [vaishnaviparodkar@gmail.com](mailto:vaishnaviparodkar@gmail.com)

🔗 GitHub: [@vaishnavi-parodkar](https://github.com/vaishnavi-parodkar)

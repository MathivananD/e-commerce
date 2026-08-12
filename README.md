# E-Commerce Backend API

A RESTful backend service built for an e-commerce platform using **Node.js** and **Express.js**.

---

## 📦 Installed Packages & Installation Commands

Below is the list of packages currently in `package.json` and the command to install each package:

| Package | Version | Installation Command | Description |
| :--- | :--- | :--- | :--- |
| [**express**](https://www.npmjs.com/package/express) | `^5.2.1` | `npm install express` | Fast, unopinionated, minimalist web framework for Node.js to handle HTTP requests and routing. |
| [**body-parser**](https://www.npmjs.com/package/body-parser) | `^2.3.0` | `npm install body-parser` | Node.js body parsing middleware to parse incoming request bodies before handlers. |
| [**nodemon**](https://www.npmjs.com/package/nodemon) | `^3.1.14` | `npm install nodemon` | Development tool that automatically restarts the server application when file changes are detected. |

---

## 📥 Command to Install Packages

### Install All Packages at Once
To install all project dependencies listed in `package.json`:
```bash
npm install
```

### Install Packages Individually
If you want to install each package separately:

```bash
# Install Express
npm install express

# Install Body Parser
npm install body-parser

# Install Nodemon (Development utility)
npm install nodemon
```

---

## 📋 Prerequisites

Before setting up the project, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)
- [Git](https://git-scm.com/)

---

## 🛠️ Available Commands & Scripts

You can run the following scripts from the project root:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm start` | `nodemon app.js` | Runs the server in development/watch mode using nodemon. |
| `npm run dev` | `nodemon app.js` | Runs the server with hot-reloading. |
| `npm test` | `echo "..."` | Executes the test runner suite. |

---

## 📁 Project Structure

```text
e-commerce/
├── app.js             # Main application entry point
├── package.json       # Project metadata, scripts, and dependencies
├── package-lock.json  # Dependency tree lockfile
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

---

## 💡 Recommended Additional Packages for E-Commerce

As the backend grows, consider installing these packages:
```bash
# Database & ORM
npm install mongoose   # MongoDB Object Modeling (or 'pg' / 'sequelize' for SQL)

# Authentication & Security
npm install jsonwebtoken bcryptjs cors dotenv

# Input Validation
npm install express-validator
```

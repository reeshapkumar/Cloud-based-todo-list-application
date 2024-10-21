# React To-Do List App

This is a simple To-Do List application built using React that allows you to add, update, and delete tasks. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed on your development machine.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/qxf2/Todo-List-App-Deployment-on-Kubernetes.git
   cd Todo-List-App-Deployment-on-Kubernetes/frontend
   ```

2. Install the project dependencies:
    ```bash
    npm install
    ```

## Environmental Variables

Environmental variables are used to configure and customize the behavior of your application. In this project, we use an environmental variable to specify the API URL for the backend server. Set following environmental variable:

   ```env
   export REACT_APP_API_URL=http://your-flask-api-url
   ```
Note: This variable is prefixed with REACT_APP_ to ensure it's recognized by Create React App (CRA).

## Usage

1. Start the React development server:

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000). You can use browser to access it.

2. **Manage Your Tasks:**

   Use the To-Do List app to efficiently manage your tasks:

   - **Add New Tasks:** Enter the task name in the input field and click "Add Task."
   - **Mark Tasks as Done:** Check the checkbox next to a task to mark it as done.
   - **Delete Tasks:** Click the "Delete" button to remove a task.

3. **Enjoy Task Management:**

   Start using this simple To-Do List app to streamline your task management!

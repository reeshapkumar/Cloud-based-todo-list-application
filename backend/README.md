# To-Do List API

This is a simple Flask-based API for a To-Do List application. It allows you to perform basic CRUD (Create, Read, Update, Delete) operations on tasks in the To-Do list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [GET /tasks](#get-tasks)
  - [POST /tasks](#post-tasks)
  - [PUT /tasks/{id}](#put-tasksid)
  - [DELETE /tasks/{id}](#delete-tasksid)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Installation

To run this application, you'll need to have Python and Docker installed. Follow these steps to get started:

1. **Clone this repository to your local machine:**

   ```bash
   git clone https://github.com/qxf2/Todo-List-App-Deployment-on-Kubernetes.git
   cd Todo-List-App-Deployment-on-Kubernetes/backend
   ```
2. **Create a virtual environment (optional but recommended)**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use`venv\Scripts\activate`
    ```
    A virtual environment helps isolate dependencies for your project.

3. **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```
    This command will install the necessary Python packages to run the application.

## Usage

Before running the application, make sure to set up the database configuration and provide the necessary environment variables.

## API Endpoints

The following endpoints are available for interacting with the To-Do List API:

### GET /tasks

Retrieve a list of all tasks.

**Request:**

- Method: GET
- URL: `/tasks`

**Response:**

- Status Code: 200 OK
- Response Body Example:

  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "done": false
    },
    {
      "id": 2,
      "title": "Walk the dog",
      "done": true
    }
  ]
  ```  

### POST /tasks

Add a new task to the list.

**Request:**

- Method: POST
- URL: `/tasks`

**Request Body Example:** 

```json
{
  "title": "Clean the house"
}
```
**Response:**

- Status Code: 201 Created
- Response Body Example:

  ```json
  {
  "id": 3,
  "title": "Clean the house",
  "done": false
  }
  ```  

### PUT /tasks/{id}

Update the status (done or not done) of a specific task.

**Request:**

- Method: PUT
- URL: `/tasks/{id}`
- Request Body Example:

  ```json
  {
    "done": true
  }

**Response:**

- Status Code: 200 OK
- Response Body Example:

  ```json
  {
  "id": 1,
  "title": "Buy groceries",
  "done": true
  }
  ```  

### DELETE /tasks/{id}

Delete a specific task from the list.

**Request:**

- Method: DELETE
- URL: `/tasks/{id}`

**Response:**

- Status Code: 200 OK
- Response Body Example:

  ```json
  {
    "id": 2,
    "title": "Walk the dog",
    "done": true
  }

## Database Configuration

This application uses MySQL as its database. You can configure the database connection by setting the following environment variables:

- `DATABASE_USER`: The MySQL database username.
- `MYSQL_ROOT_PASSWORD`: The MySQL root password.
- `DATABASE_HOST`: The host where the MySQL database is running.
- `MYSQL_DATABASE`: The name of the MySQL database.

## Environment Variables

Before running the application, make sure to set the required environment variables mentioned in above session. 

## Running the Application

To run the application, execute the following command:

```bash
python app.py
```
The application will start and listen on [http://0.0.0.0:5000](http://0.0.0.0:5000) by default. You can access the API endpoints as described in the [API Endpoints](#api-endpoints) section.

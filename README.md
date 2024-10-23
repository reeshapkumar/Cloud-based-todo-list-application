# Cloud Based To-Do List Application

Creating a To-Do List application is a great way to practice your skills in web development. Below are the steps to create a simple To-Do List application using the MERN stack with Docker Compose, including code snippets and explanations.

**Project Structure**
**Here's how the project structure will look:**

```java
todo-list-mern/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── .env
```
```
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── public/
├── docker-compose.yml
```

**Step 1: Set Up the Backend**

**A. Create the Backend Directory**

**Create the backend directory and navigate to it:**

```bash
mkdir backend
cd backend
```

**Initialize a new Node.js project:**

```bash
npm init -y
```

**Install necessary packages:**

```bash
npm install express mongoose dotenv cors
```

**Create the server.js file:**

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

**Create a .env file to store environment variables:**

```bash
MONGO_URI=mongodb://mongo:27017/todo
```

**B. Create the Dockerfile for Backend**

```dockerfile
Copy code
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Step 2: Set Up the Frontend**

**A. Create the Frontend Directory**

**Create the frontend directory and navigate to it:**

```bash
mkdir ../frontend
cd ../frontend
```

**Create a new React app:**

```bash
npx create-react-app .
```

**Modify the package.json to include a proxy for the API:**

```json
{
  "proxy": "http://backend:5000"
}
```

**Create a simple To-Do List component in src/App.js:**

```javascript
import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle })
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  const deleteTask = async (id) => {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
```

**B. Create the Dockerfile for Frontend***

```dockerfile
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Step 3: Set Up Docker Compose**

**A. Create the docker-compose.yml file**

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    depends_on:
      - mongo

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:80"

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

**Step 4: Running the Application**

**Navigate to the root of your project directory (where docker-compose.yml is located):**

```bash
cd todo-list-mern
Run Docker Compose:
```

```bash
docker-compose up --build
Access the application:

Frontend: http://localhost:3000
Backend: http://localhost:5000 (API)
```

**Step 5: Testing the Application**
Open your browser and navigate to http://localhost:3000.
You should see the To-Do List application where you can add and delete tasks.

**Step 6: Enhancements**

**Once the basic application is running, consider adding:**

Edit functionality to update existing tasks.
Task completion toggle to mark tasks as done.
Styling with CSS or a UI library like Material-UI.
User authentication to manage tasks per user.

**Conclusion**

You now have a functional To-Do List application built with the MERN stack and Docker Compose. This project serves as a solid foundation to explore more complex features and further enhance your skills in full-stack development. Let me know if you need any more help or have questions!

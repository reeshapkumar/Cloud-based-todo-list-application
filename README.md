# Todo List App Deployment on Kubernetes

This repository contains the source code and Kubernetes configuration files to deploy a Todo List application.

Following prerequisites installed:

- **Kubernetes Cluster**: You need access to a Kubernetes cluster to deploy this application. 
- **kubectl**: Install the Kubernetes command-line tool `kubectl`. You can find installation instructions. 
- **Docker**: You need Docker installed on your system to build container images. 

1. **Clone repository:**
   ```bash
   git clone https://github.com/qxf2/Todo-List-App-Deployment-on-Kubernetes.git
   cd Todo-List-App-Deployment-on-Kubernetes
   ```

2. **Creating MySQL Database:**
   ```bash
   kubectl create secret generic db-secret --from-literal=MYSQL_DATABASE=todo_database --from-literal=MYSQL_ROOT_PASSWORD=<db_password> --from-literal=DATABASE_USER=root
   ```

3. **Deploying MySQL:**
   ```bash
   kubectl apply -f kubernetes/mysql-deployment.yaml
   ```
   This will create a MySQL statefulset deployment and pod. 
   
   ```bash
   kubectl apply -f kubernetes/mysql-service.yaml
   ```
   This will create a MySQL service.

4. **Entering inside MySQL for creating table in existed database:**
   ```bash
   kubectl get pods
   ```
   Enter inside MySQL pod:
   ```bash
   kubectl exec -it <MySQL pod-name for eg. mysql-0> -- /bin/bash 
   #Login to MySQL
   mysql -u root -p  #Enter MySQL password to login
   ```
   Create a table in existed database:
   ````bash
   USE todo_database;

   CREATE TABLE IF NOT EXISTS task (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        done BOOLEAN DEFAULT FALSE
    );
    
   INSERT INTO task (title, done) VALUES
        ('Task 1', false),
        ('Task 2', true);

   ```

5. **Deploying ConfigMap:**
    ```bash
    kubectl apply -f kuberenetes/todo-configmap.yaml
    ```

6. **Building Backend Docker Image:**
    ```bash
    cd backend/
    docker build -t todo-backend:latest .
    ```

7. **Deploying the Flask Backend:** 
    ```bash
    kubectl apply -f kubernetes/backend-deployment.yaml
    ```
    This will create backend deployment, replica set and pods.
    ```bash
    kubectl apply -f backend-service.yaml
    ```
    This will create a backend service. Backend service is configured to NodePort mode as we are deploying it on Minikube. If you are deploying it on any cloud platform, please set service type to LoadBalance.

8. **Setting Ingress for Flask Backend:**
    ```bash
    kubectl apply -f backend-ingress.yaml
    ```
    If you are deploying it on Minikube, add an entry to your local `/etc/hosts` file:

     ```bash
     MINIKUBE_IP to-do-app.local
     ```
    - You will get minikube ip with following command:
    ```bash
    minikube ip
    ```
    If you are deploying on cloud, find the external IP of the Ingress controller service:

     ```bash
     kubectl get svc -n ingress-nginx
     ```

   - Add an entry to your local `/etc/hosts` file:

    ```
    EXTERNAL_IP to-do-app.local
    ```
    Now you can access backend servvice at to-do-app.local:5000

9. **Updating Frontend Dockerfile:**

10. **Building Frontend Docker Image:**
    ```bash
    cd frontend/
    docker build -t todo-frontend-react:latest .
    ```

11. **Deploying the React Frontend:** 
    ```bash
    kubectl apply -f kubernetes/frontend-deployment.yaml
    ```
    This will create frontend deployment, replica set and pods.
    ```bash
    kubectl apply -f frontend-service.yaml
    ```
    This will create a frontend service. Frontend service is configured to NodePort mode as we are deploying it on Minikube. If you are deploying it on any cloud platform, please set service type to LoadBalance.

12. **Setting Ingress for Flask Backend:**
    ```bash
    kubectl apply -f frontend-ingress.yaml
    ```

13. **Access the Todo List App:**

- **MySQL Configuration**: You can customize MySQL configuration by modifying the `kubernetes/mysql-deployment.yaml` file.

- **Backend Configuration**: Configure the Flask backend by modifying `kubernetes/backend-deployment.yaml`.

- **Frontend Configuration**: Configure the React frontend by modifying the `kubernetes/frontend-deployment.yaml`.


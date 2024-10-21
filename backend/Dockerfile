# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Install system development tools, pkg-config, and the MariaDB development package
RUN apt-get update && \
    apt-get install -y build-essential libssl-dev libffi-dev libmariadb-dev pkg-config && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install the MySQL database adapter
RUN pip install mysqlclient

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable for Flask to run in production mode
ENV FLASK_ENV=production

# Run app.py when the container launches
CMD ["python", "app.py"]

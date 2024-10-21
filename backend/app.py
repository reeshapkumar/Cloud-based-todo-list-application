# APIs for To Do List app
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{os.environ['DATABASE_USER']}:{os.environ['MYSQL_ROOT_PASSWORD']}@{os.environ['DATABASE_HOST']}/{os.environ['MYSQL_DATABASE']}"
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    done = db.Column(db.Boolean, default=False)

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'done')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(tasks_schema.dump(tasks))

@app.route('/tasks', methods=['POST'])
def add_task():
    title = request.json['title']
    new_task = Task(title=title)
    db.session.add(new_task)
    db.session.commit()
    return task_schema.jsonify(new_task)

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    #title = request.json['title']
    #done = request.json['done']
    #task.title = title
    task.done = request.json.get('done', task.done)
    db.session.commit()
    return task_schema.jsonify(task)

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return task_schema.jsonify(task)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=5000)

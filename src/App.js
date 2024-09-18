import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingID(id);
    setEditingText(taskToEdit.text);
  };

  const handleSave = (id) => {
    const updated_tasks = [...tasks]
    const tasktoedit = updated_tasks.find((task)=>task.id === id);
    if (tasktoedit) {
      tasktoedit.text = editingText
      setTasks(updated_tasks);
      setEditingID(null);
      setEditingText("");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>TO-DO List</h1>
        <input
          type="text"
          name="newTask"
          placeholder="Add Task Here"
          value={newTask}
          onChange={handleChange}
        />
        <button type="submit" className="btn">Add</button>
      </form>
      <div className="Task">
        {tasks.map((task, index) => (
          <div key={task.id} className="NewTask">
            {editingID === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={handleEditChange}
                />
                <button className="btn" onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button className="btn" onClick={() => handleEdit(task.id)}>Edit</button>
              </>
            )}
            <button className="btn" onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

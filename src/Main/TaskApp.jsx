import React, { useState } from 'react';
import styles from '../Main/Task.module.css';

import { FaTrash } from 'react-icons/fa';

function MyTaskList() {
  const [viewFilter, setViewFilter] = useState("active");
  const [newTaskInput, setNewTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const toggleTaskStatus = (taskToToggle) => {
    const updatedTasks = tasks.map((task) => {
      if (task === taskToToggle) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (viewFilter === "active") {
      return !task.isDone;
    } else if (viewFilter === "completed") {
      return task.isDone;
    }
    return true;
  });

  const addTask = () => {
    if (newTaskInput.trim() !== "") {
      setTasks([{ text: newTaskInput, isDone: false }, ...tasks]);
      setNewTaskInput('');
    }
  }

  const removeTask = (taskToRemove) => {
    const updatedTasks = tasks.filter((task) => task !== taskToRemove);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className={styles.MyTaskListMain}>
        <h1>Minha Lista de Tarefas</h1>
        <input
          type="text"
          placeholder="Nova Tarefa"
          value={newTaskInput}
          name="newTask"
          onChange={(e) => setNewTaskInput(e.target.value)}
        /><br />
        <button onClick={addTask}>Adicionar Tarefa</button>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.text} className={styles.MyTaskItem}>
              {task.text}{' '}
              <div className={styles.MyTaskItemActions}>
                <input
                  type="checkbox"
                  name="isDone"
                  className={styles.MyTaskCheckbox}
                  checked={task.isDone}
                  onChange={() => toggleTaskStatus(task)}
                />
                <button
                  className={styles.MyTaskTrashButton}
                  onClick={() => removeTask(task)}
                >
                  <FaTrash className={styles.MyTrashIcon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setViewFilter("active")}>Tarefas Ativas</button>
          <button onClick={() => setViewFilter("completed")}>Tarefas Concluídas</button>
        </div>
      </div>
    </>
  );
}

export default MyTaskList;
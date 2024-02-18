import React, { useEffect, useState } from 'react';
import './TasksScreen.css';
import {
  createTask,
  deleteTask,
  getTasks,
  taskListener,
  TaskProps,
} from '../../functions';
import { useToast } from '../../components/Toast';

let tasks: TaskProps[] = [];

const TasksList = (props: { taskList: TaskProps[] }) => {
  return (
    <>
      {props.taskList.map((task) => (
        <button
          onClick={() => deleteTask(task.title)}
          className="tasks-screen__task-list-button-item"
          key={task.title}
        >
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </button>
      ))}
    </>
  );
};

function TasksScreen() {
  const [, forceUpdate] = useState({});
  const [renderedTasks, setRenderedTasks] = useState<TaskProps[]>(tasks);

  const orderTasksByDate = () => {
    tasks.sort((a, b) => {
      if (a.dateCreated && b.dateCreated) {
        return a.dateCreated > b.dateCreated ? -1 : 1;
      }
      return 0;
    });
  };

  const updateTasks = async (newTasks?: TaskProps[]) => {
    tasks = newTasks ?? (await getTasks());
    orderTasksByDate();
    setRenderedTasks(tasks);
    forceUpdate({});
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setRenderedTasks(
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      ),
    );
    forceUpdate({});
  };

  const showToast = useToast();

  useEffect(() => {
    return taskListener(
      async (newTasks) => {
        await updateTasks(newTasks);
      },
      (e) => {
        showToast(e.message, 5, 's');
      },
    );
  }, [showToast]);

  const handleAddTask = async () => {
    try {
      await createTask({
        title: 'New task title' + tasks.length,
        description: 'New task description',
      });
    } catch (e: any) {
      showToast(e.message, 5, 's');
    }
  };

  return (
    <div className="tasks-screen__container">
      <div className="tasks-screen__header">
        <span>Tasks</span>
        <button onClick={handleAddTask}>Add task</button>
      </div>
      <input
        className="tasks-screen__search-bar"
        type="text"
        placeholder="Search tasks"
        onChange={handleSearch}
      />
      <TasksList taskList={renderedTasks} />
    </div>
  );
}

export default TasksScreen;

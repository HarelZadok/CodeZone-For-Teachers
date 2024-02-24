import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './TasksScreen.css';
import {
  deleteTask,
  getTasks,
  taskListener,
  TaskProps,
  useListener,
} from '../../functions';
import { useToast } from '../../components/Toast';
import { CreateNewTask } from '../../components/CreateNewTask';

let tasks: TaskProps[] = [];

const TasksList = (props: { taskList: TaskProps[] }) => {
  if (props.taskList.length === 0) {
    return (
      <div className="tasks-screen__no-tasks">
        <h1>No tasks found</h1>
        <p>Try adding a new task</p>
      </div>
    );
  }

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
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [showBody, setShowBody] = useState(true);

  useListener('mouseup', (e) => {
    if (e.button === 3) {
      e.preventDefault();
      setIsCreatingTask(false);
    }
  });

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
    setIsCreatingTask(true);
  };

  return (
    <div className="tasks-screen__container">
      <CSSTransition
        in={isCreatingTask}
        timeout={500}
        onEntered={() => setShowBody(false)}
        onExit={() => setShowBody(true)}
        classNames="tasks-screen__create-task"
        unmountOnExit
      >
        <div className="tasks-screen__task-container">
          <CreateNewTask onBackPressed={() => setIsCreatingTask(false)} />
        </div>
      </CSSTransition>
      {showBody && (
        <>
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
        </>
      )}
    </div>
  );
}

export default TasksScreen;

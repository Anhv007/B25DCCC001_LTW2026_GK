import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tải dữ liệu: ưu tiên localStorage, không có thì gọi API
  useEffect(() => {
    const saved = localStorage.getItem('gk_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get('/data/tasks.json', { signal: controller.signal })
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Lưu dữ liệu mỗi khi tasks đổi (chỉ khi đã tải xong và không lỗi)
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading, error]);

  const addTask = (task) => {
    const newId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    setTasks([...tasks, { ...task, id: newId, done: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home tasks={tasks} />} />
        <Route
          path="tasks"
          element={<TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />}
        />
        <Route path="tasks/new" element={<AddTask onAdd={addTask} />} />
        <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
      </Route>
    </Routes>
  );
};

export default App;     
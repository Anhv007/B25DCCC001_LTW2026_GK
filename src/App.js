import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/new" element={<AddTask />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      <h2>Danh sách</h2>
      <TaskTable tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
    </div>
  );
};

export default TaskList;
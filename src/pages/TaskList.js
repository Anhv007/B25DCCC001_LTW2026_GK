import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [keyword, setKeyword] = useState('');
  const [priority, setPriority] = useState('Tất cả');

  const filtered = tasks.filter(
    ({ title, priority: p }) =>
      title.toLowerCase().includes(keyword.trim().toLowerCase()) &&
      (priority === 'Tất cả' || p === priority)
  );

  return (
    <div>
      <h2>Danh sách</h2>
      <FilterBar
        keyword={keyword}
        priority={priority}
        onKeywordChange={setKeyword}
        onPriorityChange={setPriority}
      />
      <p>{`Tìm thấy ${filtered.length} công việc`}</p>
      <TaskTable tasks={filtered} onDelete={onDelete} onToggle={onToggle} />
    </div>
  );
};

export default TaskList;
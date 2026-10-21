import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    assignee: '',
    priority: 'Trung bình',
    hours: '',
  });
  const [message, setMessage] = useState('');
  const { title, assignee, priority, hours } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra ô trống
    if (title.trim() === '' || assignee.trim() === '' || hours.trim() === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra số giờ
    const hoursNum = Number(hours);
    if (!Number.isInteger(hoursNum) || hoursNum < 1 || hoursNum > 40) {
      setMessage('Số giờ phải từ 1 đến 40');
      return;
    }

    // 3. Hợp lệ: thêm và chuyển về danh sách
    onAdd({
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: hoursNum,
    });
    navigate('/tasks', { replace: true });
  };

  return (
    <div>
      <h2>Thêm mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Tên công việc</label>
          <input id="title" name="title" type="text" value={title} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="assignee">Người làm</label>
          <input id="assignee" name="assignee" type="text" value={assignee} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="priority">Mức ưu tiên</label>
          <select id="priority" name="priority" value={priority} onChange={handleChange}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="hours">Số giờ ước tính</label>
          <input id="hours" name="hours" type="number" value={hours} onChange={handleChange} />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTask;
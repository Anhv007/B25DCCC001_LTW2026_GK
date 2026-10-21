import { PRIORITIES } from '../data';

const FilterBar = ({ keyword, priority, onKeywordChange, onPriorityChange }) => (
  <div className="filter-bar">
    <label htmlFor="search">Tìm kiếm</label>
    <input
      id="search"
      type="text"
      value={keyword}
      onChange={(e) => onKeywordChange(e.target.value)}
    />
    <label htmlFor="priorityFilter">Mức ưu tiên</label>
    <select
      id="priorityFilter"
      value={priority}
      onChange={(e) => onPriorityChange(e.target.value)}
    >
      <option value="Tất cả">Tất cả</option>
      {PRIORITIES.map((p) => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;
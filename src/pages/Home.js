const Home = ({ tasks }) => {
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const remainingHours = tasks.reduce(
    (sum, { done, hours }) => (done ? sum : sum + hours),
    0
  );

  return (
    <div>
      <h2>Công việc nhóm</h2>
      <p>{`Tổng số công việc: ${total}`}</p>
      <p>{`Số công việc đã xong: ${doneCount}`}</p>
      <p>{`Tổng số giờ còn lại: ${remainingHours}`}</p>
    </div>
  );
};

export default Home;
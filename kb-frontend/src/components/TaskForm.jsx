import React, { useState } from 'react';
import TaskStatus from './TaskStatus';

// 全局唯一id生成器，初始值为1
let nextTaskId = 1;

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState(TaskStatus.TODO); // 默认状态为待办
  const [attachment, setAttachment] = useState(null); // 附件

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: nextTaskId,
      title,
      description,
      dueDate,
      status,
      attachment, // 将附件信息也传递给父组件
    };
    onAddTask(newTask);
    // 增加全局id计数器
    nextTaskId++;
    // 重置表单字段
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus(TaskStatus.TODO); // 重置状态为待办
    setAttachment(null); // 清空附件信息
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={TaskStatus.TODO}>Todo</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

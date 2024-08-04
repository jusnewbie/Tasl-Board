import React, { useState } from 'react';
import TaskForm from './TaskForm';
import './ProjectCard.css'; // 引入样式文件

const ProjectCard = ({ project, onAddTask }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [comments, setComments] = useState({}); // 用来存储任务评论的对象

  const handleToggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleAddTask = (task) => {
    onAddTask(project.id, task);
    setShowTaskForm(false);
  };

  const handleCommentChange = (taskId, comment) => {
    setComments({
      ...comments,
      [taskId]: comment,
    });
  };

  const handleSaveComment = async (taskId) => {
    try {
      const commentText = comments[taskId];
      const response = await fetch(`http://localhost:3000/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 可以添加其他认证头部或token等
        },
        body: JSON.stringify({ text: commentText }),
      });
      if (!response.ok) {
        throw new Error('Failed to save comment');
      }
      console.log(`Comment for task ${taskId} saved successfully`);
      // 可以在此处更新本地状态或做其他处理
    } catch (error) {
      console.error('Error saving comment:', error.message);
      // 可以添加错误处理逻辑，例如显示错误消息给用户
    }
  };

  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <button onClick={handleToggleTaskForm}>Add Task</button>
      {showTaskForm && <TaskForm onAddTask={handleAddTask} />}

      <ul>
        {project.tasks.map(task => (
          <li key={task.id}>
            <span>{task.id}.</span> {task.title} ({task.status})
            <br />
            <textarea
              rows="3"
              placeholder="Add a comment..."
              value={comments[task.id] || ''}
              onChange={(e) => handleCommentChange(task.id, e.target.value)}
            />
            <button onClick={() => handleSaveComment(task.id)}>Save Comment</button>
            {comments[task.id] && (
              <div>
                <p><strong>Member ID:</strong> robot</p>
                <p>{comments[task.id]}</p>
              </div>
            )}

            {/* 显示附件信息 */}
            {task.attachment && (
              <div>
                <p><strong>Attachment:</strong> {task.attachment.name}</p>
                <p><a href={URL.createObjectURL(task.attachment)} download>Download Attachment</a></p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;

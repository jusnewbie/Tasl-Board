// ProjectList.jsx
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import TaskForm from './TaskForm';

const ProjectList = ({onLogout}) => {
  const [projects, setProjects] = useState([]);

  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      tasks: []
    };
    setProjects([...projects, newProject]);
  };

  const handleAddTask = (projectId, task) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: [...project.tasks, task]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div>
      <button onClick={handleCreateProject}>Create Project</button>
      <div style={{ display: 'flex', gap: '20px' }}>
        {projects.map(project => (
          <div key={project.id}>
            <ProjectCard project={project} onAddTask={handleAddTask} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

import React from 'react';

const ProjectInfo = ({ project, handleStart, handleComplete, handleRemove }) => {
  const isPastDue = new Date(project.dueDate) < new Date();

  return (
    <tr className={isPastDue ? 'past-due' : ''}>
      <td>{project.name}</td>
      <td>{new Date(project.dueDate).toLocaleDateString()}</td>
      <td>
        {project.status === 'Backlog' && (
          <button className="btn btn-warning" onClick={() => handleStart(project._id)}>Start Project</button>
        )}
        {project.status === 'In Progress' && (
          <button className="btn btn-success" onClick={() => handleComplete(project._id)}>Move to Completed</button>
        )}
        {project.status === 'Completed' && (
          <button className="btn btn-danger" onClick={() => handleRemove(project._id)}>Remove Project</button>
        )}
      </td>
    </tr>
  );
};

export default ProjectInfo;

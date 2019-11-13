import React, {useState} from 'react';
import  {FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { db } from '../firebase';

export const IndividualProject = ({project}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = docId => {
    db.collection('projects').doc(docId).delete()
    .then( ()=>{
      setProjects([...projects]); //forces the update of the project state from the database
      setSelectedProject('INBOX');
    })
  };

  return (
    <>
      <span className = "sidebar__dot">•</span>
      <span className = "sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={() => setShowConfirm(!showConfirm)}
        tabIndex={0}
        role="button"
      >
        <FaTrashAlt />
        {showConfirm && (
          <span className="project-delete-modal">
            <span className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                tabIndex={0}
                role="button"
              >
                Cancel
              </span>
            </span>
          </span>
        )}
      </span>
    </>
  )
}

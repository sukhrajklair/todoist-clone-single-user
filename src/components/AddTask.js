import React, {useState, useEffect} from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { db } from '../firebase';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import * as helpers from '../helpers';
import { collatedTasks } from '../constants';

export const AddTask = ({
  showAddTaskMain = true, 
  shouldShowMain = false, 
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask ] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOveraly, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  // if the selected project from the sidebar changes, set the selected project from project
  // overlay to empty
  useEffect(()=>setProject(''),[selectedProject]);

  const addTask = () => {
    console.log(project, selectedProject);
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY'){
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }

    return( task && (projectId && 
      db.collection('tasks')).add({
        archived: false,
        date: collatedDate || taskDate,
        projectId,
        task,
        userId: 'QlsIj4QNTjLDyK4iP0zk',
      }).then(()=>{
        setTask('');
        setProject('');
        setShowMain(false);
        setShowProjectOverlay(false);
      }))
  }

  return(
  <div 
    className = { showQuickAddTask? "add-task add-task__overlay": "add-task"}
    data-testid = "add-task-comp"
  >
    {showAddTaskMain && (
      <div
        className = "add-task__shallow"
        data-testid = "show-main-action"
        onClick = { ()=> setShowMain(!showMain)}
      >
        <span className = "add-task__plus">+</span>
        <span
          className = "add-task__text"
          data-testid = "add-task-action"
        >
          Add Task
        </span>
      </div> 
    )}
    {(showMain || showQuickAddTask) && (
      <div className = "add-task__main" data-testid = "add-task-main">
        { showQuickAddTask && (
          <>
            <div data-testid = "quick-add-task">
              <h2 className = "header">Quick Add Task</h2>
              <span 
                className = "add-task__cancel-x"
                data-testid = "add-task-quick-cancel"
                onClick = {() => {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                  setShowQuickAddTask(false);
                }}
              >
                X
              </span>
            </div>
          </>
        )}
        <ProjectOverlay 
          setProject = {setProject} 
          showProjectOverlay = {showProjectOveraly}
          setShowProjectOverlay = {setShowProjectOverlay}
          />
        <TaskDate 
          setTaskDate = {setTaskDate}
          showTaskDate = {showTaskDate}
          setShowTaskDate = {setShowTaskDate}
          />
        <input 
          className="add-task__content"
          data-testid = "add-task-content"
          type = "text"
          value = {task}
          onChange = { e=> setTask(e.target.value)}
        />
        <button 
          className = "add-task__submit"
          data-testid = "add-task"
          onClick = { () => 
            showQuickAddTask ? addTask() && setShowQuickAddTask(false)
            : addTask() }
        >
          Add Task
        </button>
        
        {!showQuickAddTask && (
          <span 
            className = "add-task__cancel"
            data-testid = "add-task-main-cancel"
            onClick = {() => {
              setShowMain(false);
              setShowProjectOverlay(false);
            }}
          >
            Cancel
          </span>
        )}
        <span 
          className = "add-task__selected-project"
          data-testid = "add-task-selected-project" 
        >
          {`Project: ${!helpers.collatedTasksExist(selectedProject)?
            helpers.getTitle(projects, project).name
            : project?
              helpers.getTitle(projects, project).name
              : helpers.getCollatedTitle(collatedTasks, selectedProject).name
          }`}
        </span>
        <span 
          className = "add-task__selected-date"
          data-testid = "add-task-selected-date" 
        >
          {`Date: ${taskDate}`}
        </span>
        <span 
          className = "add-task__project"
          data-testid = "show-project-overlay"
          onClick = {()=> setShowProjectOverlay(!showProjectOveraly)}
        >
          <FaRegListAlt />
        </span>
        <span 
          className = "add-task__date"
          data-testid = "show-date-overlay"
          onClick = {()=> setShowTaskDate(!showTaskDate)}
        >
          <FaRegCalendarAlt />
        </span>
      </div>
    )}
  </div>
  );
}
import {useState, useEffect } from 'react';
import moment from 'moment';

import { db } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(()=> {
    let query = db.collection('tasks')//partial query, this will return all docs 

    //further filter the docs using where
    if (selectedProject && !collatedTasksExist(selectedProject)) 
      query = query.where('projectId','==', selectedProject)
    else if(selectedProject === 'TODAY') 
      query = query.where('date', '==', moment().format('DD/MM/YYYY'))
    else if(selectedProject === 'INBOX' || selectedProject === 0) 
      query = query.where('date', '==', '')
    else 
      query = query.where('userId', '==', 'QlsIj4QNTjLDyK4iP0zk');

    //add listener to the query to get realtime updates
    //the .onSnapshot() method also returns a function to unsubscribe from the query
    const unsubscribe = query.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }))

      setTasks(
        selectedProject === 'NEXT_7' ?
        newTasks.filter(
          task=> moment(task.date, 'DD-MM-YYYY').diff(moment(),'days') <= 7 &&
          task.archived !== true
        )
        : newTasks.filter(task => task.archived !== true)
      )
      
      setArchivedTasks(
        newTasks.filter(task => task.archived!==false)
      )
    })
    //the returned function will be called after the component unmounts
    return ()=> unsubscribe();
  },[selectedProject]) //passing empty array will make the useEffect callback run only once after the component has been mounted
  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState();

  useEffect( () => {
    db.collection('projects')
    .where('userId', '==', 'QlsIj4QNTjLDyK4iP0zk')
    .orderBy('projectId')
    .get()
    .then(snapshot => {
      const allProjects = snapshot.docs.map( project => ({
        ...project.data(),
        docId: project.id,
      }));
      if (JSON.stringify(allProjects) !== JSON.stringify(projects)){
        setProjects(allProjects);
      }
    })
    .catch(err => console.log(err));
  }, [projects])

  return { projects, setProjects };
};
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask} from '../components/AddTask';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import {db} from '../firebase';

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({selectedProject:'1'})),
  useProjectsValue: jest.fn(()=>({projects:[{projectId:1, name:'Music'}]}))
}))

jest.mock('../firebase',()=>({
  db: {
    collection: jest.fn(()=>({
      add: jest.fn(()=>(Promise.resolve('Never mock firebase'))),
    })),
  },
}));

jest.mock('../helpers',()=>({
  collatedTasksExist: jest.fn(),
  getTitle: jest.fn(()=>({name:''})),
  getCollatedTitle: jest.fn(()=>({name:''}))
}))

beforeEach(cleanup); // clean the DOM!

describe('<AddTask />',()=>{
  afterEach(()=>{
    jest.clearAllMocks();
  });

  describe('Success',()=>{
    it('renders the <AddTask />',()=>{
      const {queryByTestId} = render(<AddTask />)
      expect(queryByTestId('add-task-main-comp')).toBeTruthy();
    })

    it('renders the <AddTask /> quick overlay',()=>{
      const setShowQuickAddTask = jest.fn();

      const {queryByTestId,debug} = render(<AddTask 
        showAddTaskMain
        shouldShowMain={false}
        showQuickAddTask 
        setShowQuickAddTask = {setShowQuickAddTask}/>)
      expect(queryByTestId('add-task-quick-comp')).toBeTruthy();
    })

    it('renders the <AddTask /> main showable when clicked',()=>{
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain/>)
      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    })

    it('renders the <AddTask /> project overlay when clicked',()=>{
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on project button
      fireEvent.click(queryByTestId('show-project-overlay'));
      //check the project selection overlay is rendered
      expect(queryByTestId('project-overlay')).toBeTruthy();
    })

    it('renders the <AddTask /> task date overlay when clicked',()=>{
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on date button
      fireEvent.click(queryByTestId('show-task-date-overlay'));
      //check the date selection overlay is rendered
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    })
    
    it('renders the <AddTask /> task date overlay and adds a task with today\'s date',()=>{
      const addSpy = jest.spyOn(db,'collection');
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on date button
      fireEvent.click(queryByTestId('show-task-date-overlay'));
      //check the date selection overlay is rendered
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
      //click on today
      fireEvent.click(queryByTestId('task-date-today'))
      //check the overlay has closed
      expect(queryByTestId('task-date-overlay')).toBeFalsy();
      //click on add task
      fireEvent.click(queryByTestId('add-task'));
      
    })

    it('renders the <AddTask /> task date overlay and adds a task with tomorrow\'s date',()=>{
      
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on date button
      fireEvent.click(queryByTestId('show-task-date-overlay'));
      //check the date selection overlay is rendered
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
      //click on tomprrpw
      fireEvent.click(queryByTestId('task-date-tomorrow'))
      //check the overlay has closed
      expect(queryByTestId('task-date-overlay')).toBeFalsy();
      //click on add task
      fireEvent.click(queryByTestId('add-task'));
      
    })

    it('renders the <AddTask /> task date overlay and adds a task with next week\'s date',()=>{
      
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on date button
      fireEvent.click(queryByTestId('show-task-date-overlay'));
      //check the date selection overlay is rendered
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
      //click on Next week
      fireEvent.click(queryByTestId('task-date-next-week'))
      //check the overlay has closed
      expect(queryByTestId('task-date-overlay')).toBeFalsy();
      //click on add task
      fireEvent.click(queryByTestId('add-task'));
      
    })

    it('hides the <AddTask /> task main when cancel is clicked',()=>{
      const {queryByTestId,debug} = render(<AddTask showAddTaskMain />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //click on cancel button
      fireEvent.click(queryByTestId('add-task-main-cancel'));
      //check the add-task-main hides
      expect(queryByTestId('add-task-main')).toBeFalsy();
    })

    it('renders the <AddTask /> for quick add task and then cancel',()=>{
      let showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn((val) => val);

      const {queryByTestId,debug} = render(<AddTask showAddTaskMain showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask}/>)
      //check quick add task is rendered
      expect(queryByTestId('add-task-quick-comp')).toBeTruthy();
      //click on cancel button from the quick add task component
      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      //check if the setShowQuickAddTask has been called after clicking the cancel button
      expect(setShowQuickAddTask).toHaveBeenCalled();
    })

    it('renders <AddTask /> and adds a task to the inbox and clears state',()=>{
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'INBOX'
      }));

      const addSpy = jest.spyOn(db,'collection');
      const {queryByTestId,debug} = render(<AddTask showQuickAddTask={false} />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      //add text to the input field
      fireEvent.change(queryByTestId('add-task-content'),{
        target: {value: 'I am a new task and I am amazing'}
      });
      //check the value of the input field
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing');
      //click on add-task button
      fireEvent.click(queryByTestId('add-task'));

    })

    it('renders <AddTask /> and adds a task to the inbox and clears state',()=>{
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY'
      }));

      const addSpy = jest.spyOn(db,'collection');
      const {queryByTestId,debug} = render(<AddTask showQuickAddTask={false} />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      fireEvent.change(queryByTestId('add-task-content'),{
        target: {value: 'I am a new task and I am amazing'}
      });
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing');
      fireEvent.click(queryByTestId('add-task'));
      expect(addSpy).toHaveBeenCalled();
    })

    it('renders <AddTask /> and adds a task to the inbox and clears state',()=>{
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7'
      }));

      const addSpy = jest.spyOn(db,'collection');
      const {queryByTestId,debug} = render(<AddTask showQuickAddTask={false} />)
      //click on add task button
      fireEvent.click(queryByTestId('show-main-action'));
      //check add-task-main is rendered
      expect(queryByTestId('add-task-main')).toBeTruthy();
      fireEvent.change(queryByTestId('add-task-content'),{
        target: {value: 'I am a new task and I am amazing'}
      });
      expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing');
      fireEvent.click(queryByTestId('add-task'));
      expect(addSpy).toHaveBeenCalled();
    })
  })
})
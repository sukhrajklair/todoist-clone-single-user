import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

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

beforeEach(cleanup);

describe('<Header />',()=>{
  describe('Success',()=>{
    it('renders the header component',()=>{
      const {queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy();
    })

    it('renders the header component and activates dark mode',()=>{
      let darkMode = false;
      const setDarkMode = jest.fn(()=>darkMode = !darkMode)
      const {queryByTestId } = render(<Header darkMode={darkMode} setDarkMode = {setDarkMode}/>)
      expect(queryByTestId('header')).toBeTruthy();
      //click on the dark mode button
      fireEvent.click(queryByTestId('dark-mode-action'));
      //check if set dark mode has been called
      expect(setDarkMode).toHaveBeenCalled();
      expect(darkMode).toBe(true);
    })

    it('renders the header component and renders the quick add task component',()=>{
      
      const {queryByTestId } = render(<Header />)
      expect(queryByTestId('header')).toBeTruthy();
      //click on the quick add task button
      fireEvent.click(queryByTestId('quick-add-task-action'));
      //check if quick add task has been rendered
      expect(queryByTestId('add-task-quick-comp')).toBeTruthy();
    })

    it('renders the header component and activates sidebar-collapse when clicked on logo',()=>{
      let sidebarCollapsed = false;
      const setSidebarCollapsed = jest.fn(()=>sidebarCollapsed = !sidebarCollapsed)
      const {queryByTestId } = render(<Header sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed = {setSidebarCollapsed}/>)
      expect(queryByTestId('header')).toBeTruthy();
      //click on the dark mode button
      fireEvent.click(queryByTestId('sidebar-collapse-action'));
      //check if set dark mode has been called
      expect(setSidebarCollapsed).toHaveBeenCalled();
      expect(sidebarCollapsed).toBe(true);
    })

  })
})



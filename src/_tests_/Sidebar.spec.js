import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({setSelectedProject:jest.fn()})),
  useProjectsValue: jest.fn(()=>({projects:[{projectId:1, name:'Music'}]}))
}))

jest.mock('../firebase',()=>({
  db: {
    collection: jest.fn(()=>({
      add: jest.fn(()=>(Promise.resolve('Never mock firebase'))),
    })),
  },
}));

beforeEach(cleanup);

describe('<Sidebar />', ()=>{
  describe('Success',()=>{
    it('renders the sidebar',()=>{
      const {queryByTestId} = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy();
    })

    it('renders the sidebar and set inbox as active',()=>{
      const {queryByTestId} = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy();
      //click on Inbox
      fireEvent.click(queryByTestId('inbox'));
      //check if active class has been applied to inbox component
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    })

    it('renders the sidebar and set today as active',()=>{
      const {queryByTestId} = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy();
      //click on Inbox
      fireEvent.click(queryByTestId('today'));
      //check if active class has been applied to inbox component
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    })

    it('renders the sidebar and set Next 7 Days as active',()=>{
      const {queryByTestId} = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy();
      //click on Inbox
      fireEvent.click(queryByTestId('next_7'));
      //check if active class has been applied to inbox component
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
    })

    it('renders the sidebar and hides the projects',()=>{
      const {queryByTestId, queryByText, getByText} = render(<Sidebar />)
      expect(queryByTestId('sidebar')).toBeTruthy();
      //click on Projects to hide the project list
      fireEvent.click(getByText('Projects'));
      //check if Add Project has disappeared
      expect(queryByText('Add Project')).toBeFalsy();
      
      //click on Projects to show the project list
      fireEvent.click(getByText('Projects'));
      //check if Add Project has re-appeared
      expect(queryByText('Add Project')).toBeTruthy();

    })
  })
})
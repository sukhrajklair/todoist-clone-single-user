import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import {db} from '../firebase';

beforeEach(cleanup);

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({
    selectedProject:'INBOX',
    setSelectedProject: jest.fn(()=>'INBOX')
  })),
  useProjectsValue: jest.fn(()=>({
    projects:[{projectId:1, name:'Music'}],
    setProjects: jest.fn()
  }))
}));

jest.mock('../firebase',()=>({
  db: {
    collection: jest.fn(x=>({
      add: jest.fn(x=>(Promise.resolve('Never mock firebase'))),
    })),
  },
}));

describe('<AddProjec />',()=>{
  describe('success',()=>{
    it('renders add-project input when add project is clicked from the sidebar',()=>{
      const {queryByTestId } = render(<AddProject />);
      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('project-name')).toBeTruthy();
      //add text to the input field
      fireEvent.change(queryByTestId('project-name'),{
        target: {value: 'new project'}
      });
      //check the input
      expect(queryByTestId('project-name').value).toBe('new project')
    })

    it('renders add project input and add the project when add button is clicked',()=>{
      const {queryByTestId } = render(<AddProject />);
      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('project-name')).toBeTruthy();
      //add text to the input field
      fireEvent.change(queryByTestId('project-name'),{
        target: {value: 'new project'}
      });
      //check the input
      expect(queryByTestId('project-name').value).toBe('new project')
      //click on add button
      fireEvent.click(queryByTestId('add-project-submit'));
    })

    it('renders add project input and hides input when Cancel is clicked',()=>{
      const {queryByTestId } = render(<AddProject />);
      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('project-name')).toBeTruthy();
      //click Cancel
      fireEvent.click(queryByTestId('hide-project-overlay'));
    })

  })
})
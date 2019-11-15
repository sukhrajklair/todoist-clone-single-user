import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';
import { useSelectedProjectValue, useProjectsValue } from '../context';

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

describe('<Projects />',()=>{
  describe('Success',()=>{
    it('renders the projects component', () => {

      const {queryByTestId } = render(<Projects />);
      expect(queryByTestId('project-action')).toBeTruthy();
      //fireEvent.click(queryByTestId('project-overlay-action'))
      //expect(setProject).toHaveBeenCalled();
    })

    it('renders the projects and selects an active project using onClick', () => {

      const {queryByTestId } = render(<Projects activeValue = "1"/>);
      expect(queryByTestId('project-action')).toBeTruthy();
      fireEvent.click(queryByTestId('project-action'))
      expect(queryByTestId('project-action-parent').classList.contains('active')).toBeTruthy()
    })
  })

})


import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import expectExport from 'expect';
import { italic } from 'ansi-colors';

beforeEach(cleanup);

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({selectedProject:'1'})),
  useProjectsValue: jest.fn(()=>({projects:[{projectId:1, name:'Music'}]}))
}));

describe('<ProjectOverlay />',()=>{
  describe('Success',()=>{
    it('renders the project overlay', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(()=>!showProjectOverlay);

      const {queryByTestId } = render(<ProjectOverlay 
        setProject = {setProject}
        showProjectOverlay
        setShowProjectOverlay = {setShowProjectOverlay}
        />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'))
      expect(setProject).toHaveBeenCalled();
    })
  })

  describe('Failure',()=>{
    it('does not render teh project overlay with any project', () => {
      useProjectsValue.mockImplementation(()=>({
        projects:[]
      }));

      const {queryByTestId } = render(<ProjectOverlay 
        showProjectOverlay
        />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      //project-overlay-action should not exist if projects is empty array
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    })
  })
})


import React from 'react';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import { IndividualProjects, IndividualProject } from '../components/IndividualProject';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { db } from '../firebase';

beforeEach(cleanup);

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({
    selectedProject:'INBOX',
    setSelectedProject: jest.fn(()=>console.log('setSelectedProject is called'))
  })),
  useProjectsValue: jest.fn(()=>({
    setProjects: jest.fn(),
    projects:[{projectId:1, name:'Music'}]
  }))
}));

jest.mock('../firebase',() =>({
  db: {
    collection: jest.fn(x=>({
      doc: jest.fn(x=>({
        delete: jest.fn(x=>{
          console.log('delete is called');
          return Promise.resolve('deleted')}),
        update: jest.fn(x=>Promise.resolve('updated'))
      })),
    })),
  },
}))


describe('<IndividualProject />',()=>{
  const project = {
    name: 'The Office',
    projectId: '1',
    docId: 'abc'
  }

  describe('Success',()=>{
    it('renders a project',()=>{
      const {getByText} = render(<IndividualProject project = {project} />);
      expect(getByText('The Office')).toBeTruthy();
    })
    it('renders the the delete overlay and deletes a project using delete button',()=>{
      const {queryByTestId, getByText, debug} = render(<IndividualProject project = {project} />);
      const deleteProjectSpy = jest.spyOn(db,'collection')
      //click the delete icon 
      fireEvent.click(queryByTestId('delete-project'));
      //check if the delete overlay shows up
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
      fireEvent.click(getByText('Delete'));
      //fireEvent.click(queryByTestId('delete-project-confirm'));
      //expect(getByText('Are you sure you want to delete this project?')).toBeFalsy();
      expect(deleteProjectSpy).toHaveBeenCalled();
    })
    it('renders the the delete overlay and deletes a project using delete button',()=>{
      const {queryByTestId, getByText, debug} = render(<IndividualProject project = {project} />);
      //creates a spy for collection method of the db module mocked above
      //this serves as a proxy for db.collection().doc().delete()
      const deleteProjectSpy = jest.spyOn(db,'collection')
      //click the delete icon 
      fireEvent.click(queryByTestId('delete-project'));
      //check if the delete overlay shows up
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
      fireEvent.click(getByText('Delete'));
      
      //confirm that the db.collection().doc().delete() has been called
      expect(deleteProjectSpy).toHaveBeenCalled();
    })
    it('renders the the delete overlay and cancel the delete operation',()=>{
      const {queryByTestId, getByText, debug} = render(<IndividualProject project = {project} />);
  
      //click the delete icon 
      fireEvent.click(queryByTestId('delete-project'));
      //check if the delete overlay shows up
      expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();
      fireEvent.click(getByText('Cancel'));
      //make sure project delete overlay disappears
      expect(queryByTestId('project-delete-modal')).toBeFalsy();
    })
  })
})

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import {db} from '../firebase';
import { useTasks } from '../hooks';

jest.mock('../context',()=>({
  useSelectedProjectValue: jest.fn(()=>({
    selectedProject:'INBOX',
    setSelectedProject: jest.fn(()=>'INBOX')
  })),
  useProjectsValue: jest.fn(()=>({
    projects:[{projectId:'1', name:'Music'}],
    setProjects: jest.fn()
  }))
}));

jest.mock('../hooks',()=>({
  useTasks: jest.fn(()=>({
    tasks:[
      {
        id: '1',
        archived: false,
        data: '',
        projectId:'1',
        task:'simple task'
      }
    ]
  }))
}))

beforeEach(cleanup);

describe('<Tasks />',()=>{
  afterEach(()=>jest.clearAllMocks());

  it('renders tasks',()=>{
    const {queryByTestId} = render(<Tasks/>)
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  })

  it('renders tasks of a non-collated project name',()=>{
    useSelectedProjectValue.mockImplementation(()=>({
      selectedProject:'1'
    }))
    const {queryByTestId} = render(<Tasks/>)
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Music');
  })
})
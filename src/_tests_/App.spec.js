import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe('<App />',()=>{
  it('renders the application',() => {
    const {queryByTestId, debug} = render(<App />);
    //debug();
    expect(queryByTestId('application')).toBeTruthy();
    expect(queryByTestId('application').classList.contains('darkmode')).toBeFalsy();
  })
  it('renders the application using dark mode',() => {
    const {queryByTestId, debug} = render(<App darkModeDefault/>);
    //debug();
    expect(queryByTestId('application')).toBeTruthy();
    expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
  })
  it('renders the application',() => {
    const {queryByTestId, debug} = render(<App />);
    //debug();
    expect(queryByTestId('application')).toBeTruthy();
    fireEvent.click(queryByTestId('application'));
    //checks if the sidebar collapses when the screen width is below 900 px
    //and you click anywhere on the app 
    expect(queryByTestId('sidebar').classList.contains('sidebar__slid-right')).toBeFalsy();
  })
})
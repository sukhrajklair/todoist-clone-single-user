import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';


beforeEach(cleanup); // clean the DOM!

jest.mock('../firebase',()=>({
  db: {
    collection: jest.fn(()=>({
      doc: jest.fn(()=>({
        update: jest.fn()
      })),
    })),
  },
}));

describe('<Checkbox>',()=>{
  describe('success',() => {
    it('renders the task checkbox',()=> {
      const { queryByTestId, debug } = render(<Checkbox id="1" />);
      //debug();
      expect (queryByTestId('checkbox-action')).toBeTruthy();
    })
  })
  it('renders the task checkbox and accepts a onClick', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" taskDesc="Finish this tutorial series!" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
    fireEvent.click(queryByTestId('checkbox-action'));
  });
})
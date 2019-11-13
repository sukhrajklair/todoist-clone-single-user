import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';
import { italic } from 'ansi-colors';

beforeEach(cleanup); // clean the DOM!

jest.mock('../firebase',()=>({
  db: {
    collections: jest.fn(()=>({
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
      expect (queryByTestId('checkbox-action')).toBeTruthy();
    })
  })
})
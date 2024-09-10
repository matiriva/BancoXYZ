import React from 'react';
//import renderer from 'react-test-renderer';
import {  render, fireEvent, waitFor, screen } from '@testing-library/react-native';
//import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'
import '@testing-library/jest-dom';
import { expect, test } from '@jest/globals';
//import {render, screen} from '@testing-library/react';

// SCREENS
import Home from '../screen/Home';

// CONST

// -----------------------------------------------------
describe('Home', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });
// -----------------------------------------------------
  
  // --- TEST 1
  it('Render página Home  ', () => {
    const { getByTestId } = render(<Home />);

  });

  // --- TEST 2
  it('Render Texto balance y moneda', async () => {
    const { getByTestId } = render(<Home />);


    await waitFor(() => {

      const tiBalance = getByTestId('tiBalance');
     expect(tiBalance).toBeOnTheScreen();
     expect(tiBalance).toBeTruthy();
    });

  });

  
});

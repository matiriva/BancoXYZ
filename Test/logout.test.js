import React from 'react';
import {  render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'
import '@testing-library/jest-dom';
import { expect, test } from '@jest/globals';

// SCREENS
import LogOut from '../screen/LogOut';

// CONST

// -----------------------------------------------------
describe('LogOut', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });
// -----------------------------------------------------
  
  // --- TEST 1
  it('Render página LogOut  ', () => {
    const { getByTestId } = render(<LogOut />);

  });

  // --- TEST 2
  it('Render Texto SalirMsg y BtnSalir', () => {
    const { getByTestId } = render(<LogOut />);
    
    expect(getByTestId('tiTxtSalirMsg')).toBeOnTheScreen();
    expect(getByTestId('tiBtnSalir')).toBeOnTheScreen();
  });


});

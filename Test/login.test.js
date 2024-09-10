import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
//import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage';
import '@testing-library/jest-dom';
import { expect, test } from '@jest/globals';
//import { screen } from '@testing-library/react'
//import { render, screen } from '@testing-library/react';
// Screens
import Login from '../screen/Login';

// Mock de Alert
//jest.spyOn(Alert, 'alert').mockImplementation(() => {});


// -----------------------------------------------------
describe('Login', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });

// -----------------------------------------------------
  // --- TEST 1
  it('Rendner Login page', () => {
    const { getByTestId } = render(<Login />);
    //expect(1).toBe(1);
  });

  // --- TEST 2
  it('Render de campos email y password', () => {
    const { getByTestId } = render(<Login />);

    expect(getByTestId('tiEmail')).toBeTruthy();
    expect(getByTestId('tiPassword')).toBeTruthy();

  });

});
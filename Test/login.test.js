import React from 'react';
//import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'

// Screens
import Login from '../screen/Login';

// Mock de Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Login', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });

  it('Render página Login  ', () => {
    const { getByTestId } = render(<Login />);
    
    expect(getByTestId('tiEmail')).toBeTruthy();
    expect(getByTestId('tiPassword')).toBeTruthy();
  });

});



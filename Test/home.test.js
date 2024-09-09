import React from 'react';
//import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
//import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'

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

  it('Render página Home  ', () => {
    const { getByTestId } = render(<Home />);
    
    expect(getByTestId('tiBalance')).toBeTruthy();
    expect(getByTestId('tiMoneda')).toBeTruthy();
  });

});


// testID='tionSubmit' 

// testID='tiRefrescar'
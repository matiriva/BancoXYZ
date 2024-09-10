import React from 'react';
//import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
//import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'

// SCREENS
import Transferencias from '../screen/Transferencias';

// CONST

// -----------------------------------------------------

describe('Transferencias', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });

  it('Render página Transferencias  ', () => {
    const { getByTestId } = render(<Transferencias />);
    
    expect(getByTestId('tiFilter')).toBeTruthy();
    expect(getByTestId('tionSubmit')).toBeTruthy();
  });

});


// testID='tionSubmit' 

// testID='tiRefrescar'
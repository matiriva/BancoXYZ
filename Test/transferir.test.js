import React from 'react';
//import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
//import { Alert } from 'react-native';
import { __getMockPush, __mockReset } from 'expo-router';
import AsyncStorage, { __resetAllMocks, __getMockStorage } from '../mocks/async-storage'

// SCREENS
import Transferir from '../screen/Transferir';

// CONST

// -----------------------------------------------------

describe('Transferir', () => {
  beforeEach(() => {
    //__mockReset();
    __resetAllMocks();
    jest.clearAllMocks();
  });

  it('Render página Transferir  ', () => {
    const { getByTestId } = render(<Transferir />);
    
    expect(getByTestId('tiCBU')).toBeTruthy();
    expect(getByTestId('tiValor')).toBeTruthy();
    expect(getByTestId('tionSubmit')).toBeTruthy();
  });

});


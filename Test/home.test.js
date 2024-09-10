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
  it('Render Texto balance y moneda', () => {
    const { getByTestId } = render(<Home />);
    
    expect(getByTestId('tiBalance')).toBeOnTheScreen();
    expect(getByTestId('tiMoneda')).toBeOnTheScreen();
  });

  // --- TEST 3
  it('Botones renderizados, Refrescar, Transferir, Transferencias, Salir ', () => {
    const { getByTestId } = render(<Home />);
    
    expect(getByTestId('tiBtnRefrescar')).toBeOnTheScreen();
    
    expect(getByTestId('tiBtnTransferir')).toBeOnTheScreen();
    expect(getByTestId('tiBtnTransferencias')).toBeOnTheScreen();
    expect(getByTestId('tiBtnSalir')).toBeOnTheScreen();
  });

  // --- TEST 4
  it('Refrescar Saldos', async () => {
    const { getByTestId } = render(<Home />);
    

    //const tiBtnRefrescar = getByTestId('tiBtnRefrescar');
  

    await waitFor(() => {
      expect(getByTestId('tiBtnRefrescar')).toBeTruthy()
    })
  
    fireEvent.press(getByTestId('tiBtnRefrescar'))
    //expect(onGoBack()).toBeCalled()

    //expect(screen.getByTestId('tiMoneda')).toHaveTextContent('Moneda: USD');
    //fireEvent(getByTestId("tiBtnRefrescar"), "press");
    const user = userEvent.setup();
    await user.press(element);

    const linkElement = screen.getByText('Balance: 1800');
    //expect(linkElement).toBeInTheDocument();

    // const  getByText  = screen.getByTestId('tiBalance')
    // expect( getByText.props.value getByText('Balance: 1800')).toBeInTheDocument()

  
  });

});


// testID='tionSubmit' 

// testID='tiRefrescar'
import '@testing-library/jest-dom'
jest.mock('@react-native-async-storage/async-storage', () => require('./mocks/async-storage').default);
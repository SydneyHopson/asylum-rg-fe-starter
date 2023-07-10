import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GraphWrapper from '../components/pages/DataVisualizations/GraphWrapper';
import 'antd/lib/_util/responsiveObserve';

const mockStore = configureStore([]);

describe('GraphWrapper', () => {
  let store;
  let dispatchMock;

  beforeEach(() => {
    store = mockStore({});
    dispatchMock = jest.fn();
  });

  test('renders the GraphWrapper component with correct elements', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={jest.fn()} dispatch={dispatchMock} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByTestId('time-series-all')).toBeInTheDocument();
    expect(screen.getByTestId('office-heat-map')).toBeInTheDocument();
    expect(screen.getByTestId('citizenship-map-all')).toBeInTheDocument();
  });

  test('calls the clearQuery function when Clear Query button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={jest.fn()} dispatch={dispatchMock} />
        </BrowserRouter>
      </Provider>
    );

    const clearQueryButton = screen.getByRole('button', {
      name: 'Clear Query',
    });
    fireEvent.click(clearQueryButton);

    expect(dispatchMock).toHaveBeenCalled();
    // Add more assertions here to check the behavior when the Clear Query button is clicked
  });
});

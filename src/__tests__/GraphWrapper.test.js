// import React from 'react';
// import { mount } from 'enzyme';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import { BrowserRouter } from 'react-router-dom';
// import GraphWrapper from '../components/pages/DataVisualizations/GraphWrapper';

// const mockStore = configureStore([]);

// describe('GraphWrapper', () => {
//   let store;
//   let dispatchMock;

//   beforeEach(() => {
//     store = mockStore({});
//     dispatchMock = jest.fn();
//   });

//   beforeAll(() => {
//     // Mock window.matchMedia
//     window.matchMedia = jest.fn().mockImplementation(query => ({
//       matches: true,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     }));
//   });

//   it('renders the GraphWrapper component with correct elements', () => {
//     const wrapper = mount(
//       <Provider store={store}>
//         <BrowserRouter>
//           <GraphWrapper set_view={jest.fn()} dispatch={dispatchMock} />
//         </BrowserRouter>
//       </Provider>
//     );

//     const timeSeriesAllComponent = wrapper.find('[data-testId="time-series-all"]');
//     expect(timeSeriesAllComponent.exists()).toBeTruthy();

//     const officeHeatMapComponent = wrapper.find('[data-testId="office-heat-map"]');
//     expect(officeHeatMapComponent.exists()).toBeTruthy();

//     const citizenshipMapAllComponent = wrapper.find('[data-testId="citizenship-map-all"]');
//     expect(citizenshipMapAllComponent.exists()).toBeTruthy();
//   });

//   it('calls the clearQuery function when Clear Query button is clicked', () => {
//     const wrapper = mount(
//       <Provider store={store}>
//         <BrowserRouter>
//           <GraphWrapper set_view={jest.fn()} dispatch={dispatchMock} />
//         </BrowserRouter>
//       </Provider>
//     );

//     const clearQueryButton = wrapper.find('button[data-testId="clear-query"]');
//     clearQueryButton.props().onClick(); // Call the onClick event handler directly

//     expect(dispatchMock).toHaveBeenCalled();
//     // Add more assertions here to check the behavior when the Clear Query button is clicked
//   });
// });

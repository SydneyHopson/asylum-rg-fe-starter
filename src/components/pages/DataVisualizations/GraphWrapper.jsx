import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
// import test_data from '../../../data/test_data.json';

const { background_color } = colors;

const URL = 'https://hrf-asylum-be-b.herokuapp.com/cases';

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  const { office, view } = useParams();

  // Clears the visualization query
  const clearQuery = () => {
    dispatch(resetVisualizationQuery(view, office));
  };

  // Renders TimeSeriesAll component
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll data-testId="time-series-all" />;
        break;
      case 'office-heat-map':
        // Renders OfficeHeatMap component
        map_to_render = <OfficeHeatMap data-testId="office-heat-map" />;
        break;
      case 'citizenship':
        // Renders CitizenshipMapAll component
        map_to_render = <CitizenshipMapAll data-testId="citizenship-map-all" />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        // Renders TimeSeriesSingleOffice component for a specific office
        map_to_render = (
          <TimeSeriesSingleOffice
            office={office} // Passes the office as a prop to TimeSeriesSingleOffice
            data-testId="time-series-single-office"
          />
        );
        break;
      case 'citizenship':
        map_to_render = (
          <CitizenshipMapSingleOffice
            office={office} // Passes the office as a prop to CitizenshipMapSingleOffice
            data-testId="citizenship-map-single-office"
          />
        );
        break;
      default:
        break;
    }
  }
  /**
   * This function updates the state with new data based on the provided parameters.
   * It takes in the years, view, office, and stateSettingCallback as parameters.
   * The years parameter is an array that contains the starting year and ending year.
   * The view parameter determines the type of data to be fetched (either 'citizenship' or 'fiscal').
   * The office parameter specifies the office for which the data is requested. It can be 'all' or a specific office identifier.
   * The stateSettingCallback parameter is a callback function that updates the state with the fetched data.
   */
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    // Create a params object with 'from' and 'to' properties initialized using the provided years.
    const params = {
      from: years[0],
      to: years[1],
    };

    // If the office parameter is not 'all' and has a value, add the 'office' property to the params object.
    if (office !== 'all' && office) {
      params.office = office;
    }

    // Determine the endpoint based on the view parameter. If view is 'citizenship', set the endpoint to 'citizenshipSummary', otherwise set it to 'fiscalSummary'.

    const endpoint =
      view === 'citizenship' ? 'citizenshipSummary' : 'fiscalSummary';

    // Make a GET request using axios to the specific endpoint URL, passing the params object as query parameters.
    // On success, call the stateSettingCallback function, passing the view, office, and response data.
    // This function will update the state with the fetched data.
    // On error, log the error to the console.
    axios
      .get(`${URL}/${endpoint}`, { params })
      .then(res => {
        stateSettingCallback(view, office, res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div
      className="map-wrapper-container"
      role="region"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
        <button
          type="button"
          onClick={() => updateStateWithNewData([], view, office, jest.fn())}
          data-testId="clear-query"
        >
          Clear Query
        </button>
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);

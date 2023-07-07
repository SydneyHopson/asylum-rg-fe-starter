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
//import test_data from '../../../data/test_data.json';

const { background_color } = colors;

const URL = 'https://hrf-asylum-be-b.herokuapp.com/cases';

function GraphWrapper(props) {
  // Extracting necessary props
  const { set_view, dispatch } = props;

  // Extracting 'office' and 'view' from URL parameters using the 'useParams' hook
  const { office, view } = useParams();

  // Checking if 'view' is not defined and setting it to a default value of 'time-series'
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  let map_to_render;
  if (!office) {
    // No specific office selected
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    // Specific office selected
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  // Function to update state with new data based on selected years, view, and office
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    if (office === 'all' || !office) {
      // Request data based on 'view' parameter
      if (view === 'citizenship') {
        axios
          .get(`${URL}/citizenshipSummary`, {
            params: {
              from: years[0],
              to: years[1],
            },
          })
          .then(res => {
            stateSettingCallback(view, office, res.data);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        axios
          .get(`${URL}/fiscalSummary`, {
            params: {
              from: years[0],
              to: years[0],
            },
          })
          .then(res => {
            stateSettingCallback(view, office, res.data);
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else {
      // Request data based on 'view' and 'office' parameters
      if (view === 'citizenship') {
        axios
          .get(`${URL}/citizenshipSummary`, {
            params: {
              from: years[0],
              to: years[1],
              office: office,
            },
          })
          .then(res => {
            stateSettingCallback(view, office, res.data);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        axios
          .get(`${URL}/fiscalSummary`, {
            params: {
              from: years[0],
              to: years[1],
              office: office,
            },
          })
          .then(res => {
            stateSettingCallback(view, office, res.data);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }

  // Function to clear the query
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
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
      </div>
    </div>
  );
}

// Connect the component to the Redux store using the 'connect' function
export default connect()(GraphWrapper);

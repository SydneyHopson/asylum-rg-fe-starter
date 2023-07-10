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

  const clearQuery = () => {
    dispatch(resetVisualizationQuery(view, office));
  };

  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll data-testId="time-series-all" />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap data-testId="office-heat-map" />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll data-testId="citizenship-map-all" />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = (
          <TimeSeriesSingleOffice
            office={office}
            data-testId="time-series-single-office"
          />
        );
        break;
      case 'citizenship':
        map_to_render = (
          <CitizenshipMapSingleOffice
            office={office}
            data-testId="citizenship-map-single-office"
          />
        );
        break;
      default:
        break;
    }
  }

  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    const params = {
      from: years[0],
      to: years[1],
    };

    if (office !== 'all' && office) {
      params.office = office;
    }

    const endpoint =
      view === 'citizenship' ? 'citizenshipSummary' : 'fiscalSummary';

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

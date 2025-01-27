import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import PageNav from '../../common/PageNav';

function RenderLandingPage(props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header" style={{ marginBottom: '40px' }}>
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>
      //
      <div className="graphs-section" style={{ marginTop: '40px' }}>
        <div className="graph-item">
          <img src={GrantRatesByOfficeImg} alt="Grant Rates By Office" />
          <p>Search Grant Rates By Office</p>
        </div>

        <div className="graph-item middle-top">
          <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" />
          <p>Search Grant Rates Over Time</p>
        </div>

        <div className="graph-item">
          <img
            src={GrantRatesByNationalityImg}
            alt="Grant Rates By Nationality"
          />
          <p>Search Grant Rates By Nationality</p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="view-more-data-btn-container">
          <Button
            type="default"
            style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
            onClick={() => history.push('/graphs')}
          >
            View More Data
          </Button>
        </div>

        <div className="download-data-btn">
          <div style={{ marginLeft: '9px' }}>
            <Button
              type="default"
              style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
              // onClick={() => handleDownload()}
            >
              Download the Data
            </Button>
          </div>
        </div>
      </div>
      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
      <div className="bottom-section">
        <h1>Systemic Disparity Insights</h1>
        <div className="bottom-container">
          <div className="bottom-container-item left">
            <h2>36%</h2>
            <p>
              By the end of the Trump administration, the average asylum office
              grant rate had fallen 36 percent from an average of 44 percent in
              fiscal year 2016 to 28 percent in fiscal year 2020.
            </p>
          </div>
          <div className="bottom-container-item middle">
            <h2>5%</h2>
            <p>
              The New York asylum office grant rate dropped to 5 percent in
              fiscal year 2020.
            </p>
          </div>
          <div className="bottom-container-item right">
            <h2>6X lower</h2>
            <p>
              Between fiscal year 2017 and 2020, the New York asylum office’s
              average grant rate was six times lower than the San Francisco
              asylum office.
            </p>
          </div>
        </div>

        <div className="bottom-read-more-button-middle">
          <button
            type="button"
            style={{ backgroundColor: 'gray', color: 'white' }}
          >
            Read More
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <p onClick={scrollToTop} className="back-to-top">
            Back To Top ^
          </p>
        </div>
      </div>
    </div>
  );
}

export default RenderLandingPage;

import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import NavBar from '../../Auth0/nav-bar'; // Add the NavBar import here

const { primary_accent_color } = colors;

function HeaderContent() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Add this line to vertically center the items
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}
      >
        <div style={{ paddingRight: '20px' }}>
          <Link to="/" style={{ color: '#E2F0F7' }}>
            Home
          </Link>
        </div>
        <div style={{ paddingRight: '20px' }}>
          <Link to="/graphs" style={{ color: '#E2F0F7' }}>
            Graphs
          </Link>
        </div>
        <NavBar /> {/* Add the NavBar component here */}
      </div>
    </div>
  );
}

export { HeaderContent };

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';
import { FooterContent, SubFooter } from './components/Layout/Footer';
import { HeaderContent } from './components/Layout/Header';
import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';
import Auth0ProviderWithHistory from './Auth0/auth0-provider-with-history';

import { useAuth0 } from '@auth0/auth0-react'; // Add this import for useAuth0 hook
import Loading from './Auth0/Loading';
import Profile from './Auth0/Profile'; // Add this import for Loading component
import PrivateRouter from './Auth0/private-route';

const { primary_accent_color } = colors;

const store = configureStore({ reducer });

const App = () => {
  // Changed the function name from 'app' to 'App'
  const { isLoading } = useAuth0(); // Use the useAuth0 hook to get isLoading state
  if (isLoading) {
    return <Loading />; // Show loading component while authentication is in progress
  }

  const { Footer, Header } = Layout;
  return (
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
        }}
      >
        <HeaderContent />
      </Header>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/graphs" component={GraphsContainer} />
        <PrivateRouter path="/profile" component={Profile} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
  );
};

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Provider>
  </Router>,
  document.getElementById('root')
);

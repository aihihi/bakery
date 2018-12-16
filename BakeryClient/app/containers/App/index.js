/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Employee from 'containers/Employee/Loadable';
import Store from 'containers/Store/Loadable';
import WorkingDay from 'containers/WorkingDay/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Bakery Management"
        defaultTitle="Bakery Management"
      >
        <meta name="description" content="A Small Bakery" />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/employee" component={Employee} />
        <Route path="/store" component={Store} />
        <Route path="/working-day" component={WorkingDay} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import Home from './pages/Home';
import AuctionList from './pages/AuctionList';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
                {/* Add the route for the AuctionListPage */}
                <Route path="/category/:categoryId" element={<AuctionList />} />
            </Routes>
      </Layout>
    );
  }
}

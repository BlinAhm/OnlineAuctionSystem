import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import Home from './pages/Home';

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
            </Routes>
      </Layout>
    );
  }
}

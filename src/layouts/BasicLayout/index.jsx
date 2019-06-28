import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Layout from '@icedesign/layout';
import userStore from '@/store/User';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';

import './index.scss';


@observer
export default class BasicLayout extends Component {
  render() {
    console.log('userStore', userStore.userInfo);
    console.log('userStore.isLogin', userStore.isLogin);
    return (
      userStore.isLogin ?
        <Layout
          fixable
          style={{ minHeight: '100vh' }}
          className="ice-design-layout"
        >
          <Layout.Aside width={240}>
            <Aside />
          </Layout.Aside>

          <Layout.Section>
            <Layout.Main scrollable>
              <Layout.Header>
                <Header />
              </Layout.Header>
              <div className="main-container">
                <MainRoutes />
              </div>
              <Footer />
            </Layout.Main>
          </Layout.Section>
        </Layout>
        :
        <Redirect to="/user/login" />
    );
  }
}

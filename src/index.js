import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import '@/style/index.scss'

import routes from './routes';
import http from '@/utils/http.js';


React.$http = http;

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root')
);

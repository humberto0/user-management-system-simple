import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import Routes from './routes/index';

const App = () => (
    <>
      <Router>
        <ConfigProvider locale={ptBR} />
        <Routes />
      </Router>
    </>
);

export default App;

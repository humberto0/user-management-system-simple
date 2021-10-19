import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './styles.css'
import RegisterForm from "../../components/Formulario/index";
import TableUsers from "../../components/Users/index";




const Dashboard = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const [collapsed, setCollapsed]= useState(false);
    const [onForm, setOnForm]= useState(false);
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />} style={{marginTop: '65px'}} onClick={()=>{setOnForm(false)}}>
                        Usuários
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>{setOnForm(true)}}>
                        Formulários
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {onForm?
                            <>
                            <Breadcrumb.Item>Usuários</Breadcrumb.Item>
                            <Breadcrumb.Item>Formulários</Breadcrumb.Item>
                            </>
                            :
                            <>
                                <Breadcrumb.Item>Formulários</Breadcrumb.Item>
                                <Breadcrumb.Item>Usuários</Breadcrumb.Item>
                            </>
                        }
                    </Breadcrumb>
                    <div className="site-layout-background" style={onForm? { padding: 24, minHeight: 360 }:{display: 'none'}}>
                        <RegisterForm />
                    </div>
                    <div className="site-layout-background" style={!onForm? { padding: 24, minHeight: 360 }:{display: 'none'}}>
                    <TableUsers atualizar={!onForm}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©10/19/2021 Humberto de jesus Ferreira junior</Footer>
            </Layout>
        </Layout>
    )
}
export default Dashboard;

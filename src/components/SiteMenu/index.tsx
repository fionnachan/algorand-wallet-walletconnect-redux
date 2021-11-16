import { useState } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function SiteMenu() {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(isCollapsed => setCollapsed(isCollapsed))}>
      <div className="logo"><img src="./logo.svg"/></div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
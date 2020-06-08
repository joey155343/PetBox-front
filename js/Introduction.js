const { Breadcrumb, Menu } = antd;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                General
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                Layout
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                Navigation
      </a>
        </Menu.Item>
    </Menu>
);

ReactDOM.render(
    <Breadcrumb>
        <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
        <Breadcrumb.Item>
            <a href="">Component</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={menu}>
            <a href="">General</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Button</Breadcrumb.Item>
    </Breadcrumb>,
    mountNode,
);
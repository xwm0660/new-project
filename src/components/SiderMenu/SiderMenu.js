import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    return <Icon type={icon} />;
  }

  return icon;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => [path,path2]
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.location.pathname !== location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                  item.name
                )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };

  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => key && (item.key === key || item.path === key));
  };

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };

  render() {
    const { menuData, collapsed, onCollapse } = this.props;
    const { openKeys } = this.state;
    const theme = 'dark';
    const siderClass = classNames(styles.sider, {
      [styles.light]: theme === 'light',
    });
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
        openKeys,
      };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={siderClass}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src="data:image/png;base64,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" alt="logo" />
            <h1>OOZIZ</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme={theme}
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

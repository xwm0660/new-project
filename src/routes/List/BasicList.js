import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Select,
  Table,
  Divider,
  Tag,
  Modal,
  Popconfirm,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';
const Option = Select.Option;
const menuData = []
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))

export default class BasicList extends PureComponent {
  state = {
    columns: [{
      title: '事件名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '事件内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '添加时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '转化率',
      dataIndex: 'percent',
      key: 'percent',
    }, {
      title: '时间次数(30日)',
      dataIndex: 'times',
      key: 'times',
    }, {
      title: '触发用户数(30)',
      dataIndex: 'acTimes',
      key: 'acTimes',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1
            ? (
              <div>
                <a href="javascript:;" style={{ marginRight: 20 }}>编辑</a>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              </div>
            ) : null
        );
      },
    }],
    dataSource: [
      {
        key: '1',
        name: '自选登录转化',
        content: '自选页 - 登录页 - 自选页',
        time: '2018-08-08 12:00',
        percent: '100% - 40% - 38%',
        times: 100,
        acTimes: 66
      }, {
        key: '2',
        name: 'John Brown',
        content: 32,
        time: '2018-8-27',
        percent: ['nice', 'developer'],
        times: 30,
        acTimes: 40
      }, {
        key: '3',
        name: 'John Brown',
        content: 32,
        time: '2018-8-28',
        percent: ['nice', 'developer'],
        times: 30,
        acTimes: 40
      }
    ],
    count: 4,
    Modal: false,
    page: [
      '自选页', '登陆页', '行情页', '自选页', '登陆页', '行情页', '自选页', '登陆页', '行情页'
    ],
    MenuSection: ['自选页', '登陆页', '自选页', '登陆页', '自选页', '登陆页', '自选页', '登陆页', '自选页', '登陆页']
  }
  render() {
    const { columns, dataSource, page, MenuSection } = this.state;
    let menu = null
    const modalTitle = <span className={styles.modalTitle}><span>新增事件</span><Button type="primary" onClick={this.handleAdd}>增加</Button></span>

    if (page.length > 0) {
      menu = (
        <Menu className={styles.MenuItems}>
          {page.map((item, index) => {
            return <Menu.Item key={index}>
              <a onClick={() => {
                const menuData = MenuSection
                menuData.push(item)
                console.log(menuData)
                //statebushu不刷新的问题 尚待解决
                this.setState({ MenuSection: menuData })
              }}>{item}</a>
            </Menu.Item>
          })}
        </Menu>
      );
    }
    return (
      <div>
        <PageHeaderLayout>
          <Row>
            <div className={styles.addEventType}>
              <Button type="primary" style={{ width: 80, marginRight: 50, marginTop: 20 }} onClick={this.showAddModal} >新增</Button>
              <Select defaultValue="事件" style={{ width: 200, marginTop: 20 }} >
                <Option value="事件1">事件1</Option>
                <Option value="事件2">事件2</Option>
                <Option value="事件3">事件3</Option>
              </Select>
            </div>
          </Row>
          <Row>
            <Table columns={columns} dataSource={dataSource} bordered={true} pagination={false} />
            <Modal
              title={modalTitle}
              centered
              closable={false}
              visible={this.state.Modal}
              footer={[
                <Button key="submit" type="primary" onClick={() => this.setModal2Visible(false)} style={{ marginRight: 8 }}>
                  完成
              </Button>,
              ]}
            >
              <div className={styles.ModalContent}>
                <Dropdown overlay={menu} placement="bottomCenter" className={styles.DropMenu}>
                  <div>
                    <Icon type="plus-circle-o" style={{ fontSize: 20, color: '#08c' }} className={styles.iconAdd} />
                    <span>选择页面</span>
                  </div>
                </Dropdown>
                <div className={styles.MenuSection}>
                  {MenuSection.length > 0 ? MenuSection.map((item, index) => {
                    const refText = "btn" + item
                    const deleteItem = item
                    return <div key={index} className={styles.MenuSectionItem}>
                      <Button ref={refText} type='ghoust' className={styles.MenuBtn}>{item}</Button><a><Icon type="delete" style={{ fontSize: 20, color: '#08c' }} onClick={() => {
                        const newMenuSection = MenuSection.filter((item, index) => item !== deleteItem)
                        this.setState({ MenuSection: newMenuSection })
                      }} /></a>
                    </div>
                  }) : null}
                </div>
              </div>
            </Modal>
          </Row>
        </PageHeaderLayout>
      </div>
    );
  }
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    console.log(this.state.dataSource.length)
  }
  showAddModal = () => {
    this.setState({
      Modal: true
    })
  }
  setModal1Visible(Modal) {
    this.setState({ Modal });
  }

  setModal2Visible(Modal) {
    this.setState({ Modal });
  }
  handleAdd = () => {
    console.log(1111)
    const { count, dataSource } = this.state;
    const newData = {
      key: this.state.count,
      name: `Edward King`,
      content: 32,
      time: '2018',
      percent: 100,
      times: 30,
      acTimes: 40
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: this.state.count + 1,
    });
  }
}

import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Popconfirm
} from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AdvancedProfile.less';
import Item from 'antd/lib/list/Item';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;



@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class AdvancedProfile extends Component {
  state = {
    dataSource: [{
      key: '1',
      group: '管理员',
    }, {
      key: '2',
      group: '运营',

    }, {
      key: '3',
      group: '运营',

    }, {
      key: '4',
      group: '运营',

    }, {
      key: '5',
      group: '运营',
    }]
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  showModal = () => {

  }
  handleEdit = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }
  render() {
    const columns = [{
      title: '用户组',
      dataIndex: 'group',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1
            ? (
              <div>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleEdit(record.key)} >
                  <a href="javascript:;" >编辑</a>
                </Popconfirm>
              </div>
            ) : null
        );
      },
    }];

    return (
      <div>
        <Row>
          <PageHeaderLayout title="User management ">
          </PageHeaderLayout>
        </Row>
        <Row style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 30 }}>
          <Button type="primary" onClick={this.showModal} >新增</Button>
        </Row>
        <Row>
          <Table columns={columns} dataSource={this.state.dataSource} pagination={false} bordered />
        </Row>
      </div>
    );
  }
}

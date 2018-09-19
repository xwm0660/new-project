import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Row, Col, Modal, Select, AutoComplete, Form } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      account: "",
      password: "",
      group: "",
      TableData: [{
        key: '1',
        name: 'admin1',
        pwd: 888888,
        group: '管理员',
      }, {
        key: '2',
        name: 'admin2',
        pwd: 888888,
        group: '管理员2',

      }, {
        key: '3',
        name: 'admin3',
        pwd: 888888,
        group: '管理员',

      }, {
        key: '4',
        name: 'admin4',
        pwd: 888888,
        group: '管理员',

      }, {
        key: '5',
        name: 'admin5',
        pwd: 888888,
        group: '管理员',
      }]
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }
  render() {
    const renderContent = function (value, row, index) {
      let obj = {
        children: value,
        props: {}
      };
      // if (index === 4) {
      //   obj.props.colSpan = 0;
      // }
      return obj;
    };

    const columns = [{
      title: '账号',
      dataIndex: 'name',

    }, {
      title: '密码',
      dataIndex: 'pwd',
      render: renderContent
    }, {
      title: '用户组',
      dataIndex: 'group',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return <a onClick={() => this.edit(record.key)}>删除</a>
      }
    }];
    // const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;
    return (
      <PageHeaderLayout title="账号管理">
        <Row style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 30 }}>
          <Button type="primary" onClick={this.showModal} >新增</Button>
        </Row>
        <Row>
          <Table columns={columns} dataSource={this.state.TableData} pagination={false} bordered />
        </Row>
        <Modal ref="modal"
          visible={this.state.visible}
          title="账号编辑" onOk={this.handleOk} onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              保 存
          </Button>,
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取 消</Button>
          ]}>
          <p className={styles.ModalContent}><span>账号:</span>&nbsp;&nbsp;&nbsp;<input onBlur={this.accountBlur} ref='account' /></p>
          <p className={styles.ModalContent}><span>密码:</span>&nbsp;&nbsp;&nbsp;<input onBlur={this.passBlur} ref='password' /></p>
          <div className={styles.ModalContent}><span>用户组</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Select defaultValue="管理员" style={{ width: 120 }} onChange={this.handleSelect}>
              <Option value="管理员1">管理员1</Option>
              <Option value="管理员2">管理员2</Option>
              <Option value="管理员3">管理员3</Option>
            </Select>
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleOk = (e) => {
    const keyLenth = this.state.TableData.length + 1,
      { account, password, group } = this.state
    const newData = {
      key: keyLenth,
      name: account,
      pwd: password,
      group: group
    }
    this.state.TableData.push(newData)
    //服务器返回状态OK时候关掉modal
    this.setState({ visible: false });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleSelect = (value) => {
    this.setState({
      group: value
    })
  }
  edit = (key) => {
    const TableData = this.state.TableData;
    //将key发送至服务器  返回OK 就删除成功
    this.setState({ TableData: TableData.filter(item => item.key !== key) });
  }
  accountBlur = () => {
    this.setState({
      account: this.refs.account.value
    })
  }
  passBlur = () => {
    this.setState({
      password: this.refs.password.value
    })
  }
}

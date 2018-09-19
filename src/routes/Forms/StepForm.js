import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col, Table, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ButtonGroup = Button.Group;
function handleChange(value) {
    console.log('selected ' + value);
}
function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}
export default class BasicForms extends PureComponent {
    state = {
        visible: false,
        columns: [
            {
                title: '渠道账号',
                dataIndex: 'account',

            }, {
                title: '连接',
                dataIndex: 'href',

            }, {
                title: '注册时间',
                dataIndex: 'time',
            }, {
                title: '状态',
                dataIndex: 'status',
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        this.state.data.length > 1
                            ? (
                                <div>
                                    <a href="javascript:;" style={{ marginRight: 20 }}>编辑</a>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                        <a href="javascript:;">解锁</a>
                                    </Popconfirm>
                                </div>
                            ) : null
                    );
                },
            }],
        data: [
            {
                key: "1",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
            {
                key: "2",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
            {
                key: "3",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
            {
                key: "4",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
            {
                key: "5",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
            {
                key: "6",
                account: "xiaowenmin",
                href: "www.baidu.com",
                time: "2018-8-29",
                status: 'not bad'
            },
        ]
    }
    render() {
        const { visible, loading } = this.state;
        return (
            <PageHeaderLayout title="渠道列表">
                <Row>
                    <Button type="primary" size="large" style={{ marginRight: 100 }} onClick={this.showModal}>新增</Button>
                    <Select defaultValue="渠道" size="large" className={styles.Selectstyle} onChange={handleChange} style={{ marginRight: 100 }}>
                        <Option value="渠道1">渠道1</Option>
                        <Option value="渠道2">渠道2</Option>
                        <Option value="渠道3">渠道3</Option>
                        <Option value="渠道4">渠道4</Option>
                    </Select>
                    <Select defaultValue="状态" size="large" className={styles.Selectstyle} onChange={handleChange} style={{ marginRight: 100 }}>
                        <Option value="状态1">状态1</Option>
                        <Option value="状态2">状态2</Option>
                        <Option value="状态3">状态3</Option>
                        <Option value="状态4">状态4</Option>
                    </Select>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Table columns={this.state.columns} dataSource={this.state.data} onChange={onChange} pagination={false} bordered={true} />
                </Row>
                <Modal
                    visible={visible}
                    onOk={this.handleOk}
                    centered
                    onCancel={this.handleCancel}
                    closable={false}
                    footer={
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>创建</Button>
                    }>
                    <div className={styles.ModalContent}>
                        <Input size="default" placeholder="渠道账号" />
                        <Input size="default" placeholder="创建人" />
                    </div>
                </Modal>
            </PageHeaderLayout>
        );
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleDelete = (key) => {
        this.setState({
            data: this.state.data.filter(item => item.key !== key)
        })
    }
}

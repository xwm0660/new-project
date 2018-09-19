import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    Tooltip,
    Menu,
    Dropdown,
    DatePicker,
    Button,
    Select,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import styles from './DataReduce.less';
import Bzline from '../../components/Bzline/Bzline'
const { MonthPicker, RangePicker } = DatePicker;
const ButtonGroup = Button.Group;
function handleChange(value) {
    console.log('selected ' + value);
}
export default class Overview extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const renderContent = function (value, row, index) {
            let obj = {
                children: value,
                props: {}
            };
            // if (index === 4) {
            //     obj.props.colSpan = 0;
            // }
            return obj;
        };
        const columns = [{
            title: '日期',
            dataIndex: 'name',
            render: function (text, row, index) {
                if (index < 4) {
                    return <a href="#">{text}</a>;
                } else {
                    return {
                        children: <a href="#">{text}</a>,
                        // props: {
                        //     colSpan: 5
                        // }
                    };
                }
            }
        }, {
            title: '新增用户',
            dataIndex: 'age',
            render: renderContent
        }, {
            title: '新注册用户',
            // colSpan: 2,
            dataIndex: 'tel',
            render: renderContent
            // 第三列的第三行行合并
            // if (index === 2) {
            //     obj.props.rowSpan = 2;
            // }

            // 第三列的第四行被合并没了，设置 rowSpan = 0 直接不用渲染
            // if (index === 3) {
            //     obj.props.rowSpan = 0;
            // }

            // if (index === 4) {
            //     obj.props.colSpan = 0;
            // }
            // return obj;

        }, {
            title: '注册用户',
            colSpan: 0,
            dataIndex: 'phone',
            render: renderContent
        }, {
            title: '累计用户',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '绑定ooziz',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '日活跃用户',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '周活跃用户',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '月活跃用户',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '周活跃率',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: '跃活跃率',
            dataIndex: 'address',
            render: renderContent
        },
        {
            title: 'DAU/WAU',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: 'DAU/MAU',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: '次日留存',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: '3日留存',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: '7日留存',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: '15日留存',
            dataIndex: 'address',
            render: renderContent
        }, {
            title: '30日留存',
            dataIndex: 'address',
            render: renderContent
        },
        ];

        const data = [{
            key: '1',
            name: '08-01',
            age: 32,
            tel: '0571-22098909',
            phone: 18889898989,
            address: '1'
        }, {
            key: '2',
            name: '08-01',
            tel: '0571-22098333',
            phone: 18889898888,
            age: 42,
            address: '1'
        }, {
            key: '3',
            name: '08-01',
            age: 32,
            tel: '0575-22098909',
            phone: 18900010002,
            address: '1'
        }, {
            key: '4',
            name: '08-01',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: '1'
        }, {
            key: '5',
            name: '08-01',
            age: 18,
            tel: '0575-22098909',
            phone: 18900010002,
            address: '1'
        }];
        return (
            <div>
                <Row className={styles.rowtype}>
                    <RangePicker size="large" renderExtraFooter={() => 'extra footer'} showTime />
                    <Button type="ghost" size="large" className={styles.btnlft}>本周</Button>
                    <Button type="ghost" size="large" className={styles.btnlft}>本月</Button>
                    <Button type="ghost" size="large" className={styles.btnlft}>近15天</Button>
                    <Button type="ghost" size="large" className={styles.btnlft}>上月</Button>
                    <Select defaultValue="渠道" size="large" className={styles.Selectstyle} onChange={handleChange}>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                    </Select>
                    <Select defaultValue="版本" size="large" className={styles.Selectstyle2} onChange={handleChange}>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                    </Select>
                    <ButtonGroup >
                        <Button size="large" type="primary" disabled >移动应用</Button>
                        <Button size="large" type="ghost">IOS</Button>
                        <Button size="large" type="ghost">Android</Button>
                    </ButtonGroup>
                </Row>
                <Row className={styles.rowtype2}>
                    <Table className={styles.table} columns={columns} dataSource={data} pagination={false} bordered />
                </Row>
            </div >
        );
    }

}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import Bizchartsline from '../../components/Bizchartsline/Bizchartsline'
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
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    data3: [
      {
        month: "Jan",
        "次均时长": 7.0,
      },
      {
        month: "Feb",
        "次均时长": 6.9,
      },
      {
        month: "Mar",
        "次均时长": 9.5,
      },
      {
        month: "Apr",
        "次均时长": 14.5,
      },
      {
        month: "May",
        "次均时长": 18.4,
      },
      {
        month: "Jun",
        "次均时长": 21.5,
      },
      {
        month: "Jul",
        "次均时长": 25.2,
      },
      {
        month: "Aug",
        "次均时长": 26.5,
      },
      {
        month: "Sep",
        "次均时长": 23.3,
      },
      {
        month: "Oct",
        "次均时长": 18.3,
      },
      {
        month: "Nov",
        "次均时长": 13.9,
      },
      {
        month: "Dec",
        "次均时长": 9.6,
      }
    ],
    title3: ["次均时长"],
    columns: [
      {
        title: '时间',
        dataIndex: 'time',

      }, {
        title: '渠道',
        dataIndex: 'channel',
        filters: [{
          text: 'HUAWEI',
          value: 'HUAWEI',
        }, {
          text: 'OPPO',
          value: 'OPPO',
        }, {
          text: 'XIAOMI',
          value: 'XIAOMI',
        }, {
          text: 'IOS',
          value: 'IOS',
        }],
        // filterMultiple: false,
        onFilter: (value, record) => record.channel.indexOf(value) === 0,
        sorter: (a, b) => a.channel.length - b.channel.length,
      }, {
        title: '点击量',
        dataIndex: 'click',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.click - b.click,
      }, {
        title: '用户访问量',
        dataIndex: 'visits',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.visits - b.visits,
      }, {
        title: '用户注册量',
        dataIndex: 'regist',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.visits - b.visits,
      }, {
        title: '累计用户',
        dataIndex: 'users',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.visits - b.visits,
      }, {
        title: '次留',
        dataIndex: 'seconds',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.seconds - b.seconds,
      }, {
        title: '绑定ooziz',
        dataIndex: 'ooziz',
        filters: [{
          text: '是',
          value: '是',
        }, {
          text: '否',
          value: '否',
        }],
        filterMultiple: false,
        onFilter: (value, record) => record.ooziz.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
      }],
    data: [
      {
        key: '1',
        time: '2018-08-15',
        channel: "HUAWEI",
        click: 32,
        visits: 55,
        regist: 100,
        users: 200,
        seconds: 150,
        ooziz: "是",
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        time: '2018-08-16',
        channel: "IOS",
        click: 42,
        visits: 44,
        regist: 101,
        users: 156,
        seconds: 130,
        ooziz: "否",
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        time: '2018-08-17',
        channel: "OPPO",
        click: 32,
        visits: 21,
        regist: 98,
        users: 124,
        seconds: 110,
        ooziz: "是",
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '4',
        time: '2018-08-20',
        channel: "XIAOMI",
        click: 32,
        visits: 29,
        regist: 44,
        users: 166,
        seconds: 105,
        ooziz: "否",
        address: 'London No. 2 Lake Park',
      },{
        key: '5',
        time: '2018-08-15',
        channel: "HUAWEI",
        click: 32,
        visits: 55,
        regist: 100,
        users: 200,
        seconds: 150,
        ooziz: "是",
        address: 'New York No. 1 Lake Park',
      }, {
        key: '6',
        time: '2018-08-16',
        channel: "IOS",
        click: 42,
        visits: 44,
        regist: 101,
        users: 156,
        seconds: 130,
        ooziz: "否",
        address: 'London No. 1 Lake Park',
      }, {
        key: '7',
        time: '2018-08-17',
        channel: "OPPO",
        click: 32,
        visits: 21,
        regist: 98,
        users: 124,
        seconds: 110,
        ooziz: "是",
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '8',
        time: '2018-08-20',
        channel: "XIAOMI",
        click: 32,
        visits: 29,
        regist: 44,
        users: 166,
        seconds: 105,
        ooziz: "否",
        address: 'London No. 2 Lake Park',
      }
    ]
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderLayout title="渠道统计">
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
          <ButtonGroup >
            <Button size="large" type="primary" disabled >移动应用</Button>
            <Button size="large" type="ghost">IOS</Button>
            <Button size="large" type="ghost">Android</Button>
          </ButtonGroup>
        </Row>
        <Row>
          <Col span={12}>
            <Bizchartsline data={this.state.data3} title={this.state.title3} />
          </Col>
          <Col span={12}>
            <Bizchartsline data={this.state.data3} title={this.state.title3} />
          </Col>
        </Row>
        <Row>
          <Table columns={this.state.columns} dataSource={this.state.data} onChange={onChange} pagination={false} bordered={true} />
        </Row>
      </PageHeaderLayout>
    );
  }
}

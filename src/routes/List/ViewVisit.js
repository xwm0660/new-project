import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ViewVisit.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const pagesData = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9']
const today = moment(new Date()).format("YYYY/MM/DD").replace('/', '-').replace('/', '-')
function handleChange(value) {
  console.log(`selected ${value}`);
}
const SelectPages = (data) => (
  <Select defaultValue="page" onChange={handleChange} style={{ width: 120, marginRight: 50 }}>
    {data.map((item, index) => {
      return <Option value={item} key={index}>{item}</Option>
    })} 
  </Select>
);

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class ViewVisit extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  render() {
    return (
      <div>
        <div className={styles.headed}>
          {SelectPages(pagesData)}<DatePicker placeholder={today} onChange={this.onTimeChange} />
        </div>
        <p style={{ marginBottom: 10, marginTop: 10 }}>默认展示页面访问最多的一条路径</p>
        <div className={styles.ContentWrapper}>
          <div className={styles.ContentFirst}>
            <p className={styles.firstTitle}>首页</p>
            <div>
              <p><span>pv</span><span>222222</span></p>
              <p><span>uv</span><span>222222</span></p>
            </div>
          </div>
          <div className={styles.ContentSecond}>
            {
              [20, 11, 20, 4, 20].map((item, index) => {
                const content = item + '%'
                return (
                  <div className={styles.singleType} key={index}>
                    <p className={styles.secondList}>
                      {content}
                    </p>
                    <p>全网页</p>
                  </div>
                )
              })
            }
          </div>
          <div className={styles.ContentSecond}>
            {
              [20, 11, 20, 4, 20].map((item, index) => {
                const content = item + '%'
                return (
                  <div className={styles.singleType}>
                    <p className={styles.secondList}>
                      {content}
                    </p>
                    <p>预警页</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
  onTimeChange = (time) => {
    const SelectTime = new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Row, Select, Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  Tooltip
} from "bizcharts";
import styles from './CardList.less';
const Option = Select.Option;
(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  // style: { padding: 50 },
};

export default class CardList extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const data = [
      {
        country: "首页",
        population: 131744
      },
      {
        country: "币详情",
        population: 104970
      },
      {
        country: "预警",
        population: 29034
      },
      {
        country: "我的",
        population: 23489
      },
      {
        country: "资讯",
        population: 18203
      },
      {
        country: "快讯",
        population: 18203
      },
      {
        country: "全网",
        population: 18203
      },
      {
        country: "交易所",
        population: 18203
      },
      {
        country: "ooziz",
        population: 18203
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",
      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });
    return (
      <PageHeaderLayout>
        <Row>
          <Select defaultValue="页面地址" style={{ width: 200, marginTop: 20 }} >
            <Option value="事件1">页面地址1</Option>
            <Option value="事件2">页面地址2</Option>
            <Option value="事件3">页面地址3</Option>
          </Select>
        </Row>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} style={{ paddingLeft: 50 }}>
            <Chart height={500} data={dv} forceFit>
              <Coord transpose />
              <Axis
                name="country"
                label={{
                  offset: 12
                }}
              />
              <Axis name="population" />
              <Tooltip />
              <Geom type="interval" position="country*population" />
            </Chart>
          </Col>
          <Col {...topColResponsiveProps} style={{ paddingLeft: 50 }}>
            <Chart height={500} data={dv} forceFit>
              <Coord transpose />
              <Axis
                name="country"
                label={{
                  offset: 12
                }}
              />
              <Axis name="population" />
              <Tooltip />
              <Geom type="interval" position="country*population" />
            </Chart>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}

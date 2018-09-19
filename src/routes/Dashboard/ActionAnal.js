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
    Menu,
    Dropdown,
    DatePicker,
    Button,
    Select,
} from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts"
import DataSet from "@antv/data-set";
import moment from 'moment';
import styles from './ActionAnal.less';
import Bizchartsline from '../../components/Bizchartsline/Bizchartsline'
import BizInterval from '../../components/BizInterval/BizInterval'
const { MonthPicker, RangePicker } = DatePicker;
const ButtonGroup = Button.Group;
function handleChange(value) {
    console.log('selected ' + value);
}
export default class ActionAnal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data1: [
                {
                    month: "Jan",
                    "次均时长": 7.0,
                    "人均时长": 3.9
                },
                {
                    month: "Feb",
                    "次均时长": 6.9,
                    "人均时长": 4.2
                },
                {
                    month: "Mar",
                    "次均时长": 9.5,
                    "人均时长": 5.7
                },
                {
                    month: "Apr",
                    "次均时长": 14.5,
                    "人均时长": 8.5
                },
                {
                    month: "May",
                    "次均时长": 18.4,
                    "人均时长": 11.9
                },
                {
                    month: "Jun",
                    "次均时长": 21.5,
                    "人均时长": 15.2
                },
                {
                    month: "Jul",
                    "次均时长": 25.2,
                    "人均时长": 17.0
                },
                {
                    month: "Aug",
                    "次均时长": 26.5,
                    "人均时长": 16.6
                },
                {
                    month: "Sep",
                    "次均时长": 23.3,
                    "人均时长": 14.2
                },
                {
                    month: "Oct",
                    "次均时长": 18.3,
                    "人均时长": 10.3
                },
                {
                    month: "Nov",
                    "次均时长": 13.9,
                    "人均时长": 6.6
                },
                {
                    month: "Dec",
                    "次均时长": 9.6,
                    "人均时长": 4.8
                }
            ],
            title1: ["次均时长", "人均时长"],
            data3: [
                {
                    month: "Jan",
                    "次均时长": 7.0,
                    // "人均时长": 3.9
                },
                {
                    month: "Feb",
                    "次均时长": 6.9,
                    // "人均时长": 4.2
                },
                {
                    month: "Mar",
                    "次均时长": 9.5,
                    // "人均时长": 5.7
                },
                {
                    month: "Apr",
                    "次均时长": 14.5,
                    // "人均时长": 8.5
                },
                {
                    month: "May",
                    "次均时长": 18.4,
                    // "人均时长": 11.9
                },
                {
                    month: "Jun",
                    "次均时长": 21.5,
                    // "人均时长": 15.2
                },
                {
                    month: "Jul",
                    "次均时长": 25.2,
                    // "人均时长": 17.0
                },
                {
                    month: "Aug",
                    "次均时长": 26.5,
                    // "人均时长": 16.6
                },
                {
                    month: "Sep",
                    "次均时长": 23.3,
                    // "人均时长": 14.2
                },
                {
                    month: "Oct",
                    "次均时长": 18.3,
                    // "人均时长": 10.3
                },
                {
                    month: "Nov",
                    "次均时长": 13.9,
                    // "人均时长": 6.6
                },
                {
                    month: "Dec",
                    "次均时长": 9.6,
                    // "人均时长": 4.8
                }
            ],
            title3: ["次均时长"],
        }

    }
    render() {
        const { DataView } = DataSet;
        const data2 = [
            {
                State: "AL",
                "Under 5 Years": 1000,
                "5 to 13 Years": 2000,
            },
            {
                State: "AK",
                "Under 5 Years": 2000,
                "5 to 13 Years": 3000,

            },
            {
                State: "AZ",
                "Under 5 Years": 1000,
                "5 to 13 Years": 1500,

            },
            {
                State: "AR",
                "Under 5 Years": 6000,
                "5 to 13 Years": 4500,

            },
            {
                State: "CA",
                "Under 5 Years": 7500,
                "5 to 13 Years": 4500,

            },
            {
                State: "CO",
                "Under 5 Years": 3600,
                "5 to 13 Years": 2300,

            },
            {
                State: "CT",
                "Under 5 Years": 4400,
                "5 to 13 Years": 6200,

            }
        ];
        const ages = [
            "Under 5 Years",
            "5 to 13 Years",

        ];
        const dv2 = new DataView();
        dv2.source(data2)
            .transform({
                type: "fold",
                fields: ages,
                key: "age",
                value: "population",
                retains: ["State"]
            })
            .transform({
                type: "map",
                callback: obj => {
                    const key = obj.age;
                    let type;

                    if (key === "Under 5 Years") {
                        type = "a";
                    } else if (key === "5 to 13 Years") {
                        type = "b";
                    }
                    obj.type = type;
                    return obj;
                }
            });
        const colorMap = {
            "Under 5 Years": "gray",
            "5 to 13 Years": "red",
        };
        const cols2 = {
            population: {
                tickInterval: 1000
            }
        };

        return (
            <div>
                <Row className={styles.rowtype}>
                    <RangePicker size="large" renderExtraFooter={() => 'extra footer'} showTime />
                    <Button type="ghost" size="large" className={styles.btnleft} >本周</Button>
                    <Button type="ghost" size="large" className={styles.btnleft}>本月</Button>
                    <Button type="ghost" size="large" className={styles.btnleft}>近15天</Button>
                    <Button type="ghost" size="large" className={styles.btnleft}>上月</Button>
                    <Select defaultValue="渠道" size="large" className={`${styles.Selectstyle} ${styles.btnleft}`} onChange={handleChange}>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                        <Option value="渠道">渠道</Option>
                    </Select>
                    <Select defaultValue="版本" size="large" className={`${styles.Selectstyle2} ${styles.btnleft}`} onChange={handleChange}>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                        <Option value="版本">版本</Option>
                    </Select>
                    <ButtonGroup className={styles.btnleft}>
                        <Button size="large" type="primary" disabled >移动应用</Button>
                        <Button size="large" type="ghost">IOS</Button>
                        <Button size="large" type="ghost">Android</Button>
                    </ButtonGroup>
                </Row>
                <Row style={styles.Chartstyle}>
                    <Col span={12}>
                        <Bizchartsline data={this.state.data1} title={this.state.title1} />
                    </Col>
                    <Col span={12}>
                        <Chart
                            height={400}
                            data={dv2}
                            scale={cols2}
                            padding={[30, 150, 30, 50]}
                            forceFit
                        >
                            <Axis
                                name="population"
                                label={{
                                    formatter: function (val) {
                                        return val
                                    }
                                }}
                            />

                            <Tooltip />
                            <Geom
                                type="interval"
                                position="State*population"
                                color={[
                                    "age",
                                    function (age) {
                                        return colorMap[age];
                                    }
                                ]}
                                tooltip={[
                                    "age*population",
                                    (age, population) => {
                                        return {
                                            name: age,
                                            value: population
                                        };
                                    }
                                ]}
                                adjust={[
                                    {
                                        type: "dodge",
                                        dodgeBy: "type",
                                        // 按照 type 字段进行分组
                                        marginRatio: 0 // 分组中各个柱子之间不留空隙
                                    },
                                    {
                                        type: "stack"
                                    }
                                ]}
                            />
                        </Chart>
                        <div className={styles.ChartTitle}><span className={styles.lineColor1}></span><span style={{ marginRight: 20 }}>活跃用户</span><span className={styles.lineColor2}></span><span>新增用户</span></div>
                    </Col>
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
                    <Col span={12}>
                        <Bizchartsline data={this.state.data3} title={this.state.title3} />
                    </Col>
                    <Col span={12}>
                        <BizInterval />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <BizInterval />
                    </Col>
                    <Col span={12}>
                        <BizInterval />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <BizInterval />
                    </Col>
                    <Col span={12}>
                        <Chart
                            height={400}
                            data={dv2}
                            scale={cols2}
                            padding={[30, 150, 30, 50]}
                            forceFit
                        >
                            <Axis
                                name="population"
                                label={{
                                    formatter: function (val) {
                                        return val
                                    }
                                }}
                            />

                            <Tooltip />
                            <Geom
                                type="interval"
                                position="State*population"
                                color={[
                                    "age",
                                    function (age) {
                                        return colorMap[age];
                                    }
                                ]}
                                tooltip={[
                                    "age*population",
                                    (age, population) => {
                                        return {
                                            name: age,
                                            value: population
                                        };
                                    }
                                ]}
                                adjust={[
                                    {
                                        type: "dodge",
                                        dodgeBy: "type",
                                        // 按照 type 字段进行分组
                                        marginRatio: 0 // 分组中各个柱子之间不留空隙
                                    },
                                    {
                                        type: "stack"
                                    }
                                ]}
                            />
                        </Chart>
                        <div className={styles.ChartTitle}><span className={styles.lineColor1}></span><span style={{ marginRight: 20 }}>活跃用户</span><span className={styles.lineColor2}></span><span>新增用户</span></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
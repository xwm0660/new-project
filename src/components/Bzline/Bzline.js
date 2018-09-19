import { Component } from "react";
import {
    Divider,
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    Menu,
    Dropdown,
} from "antd";
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
import styles from './bzline.less'
const data = [
    {
        month: "2015-01-01",
        acc: 84.0
    },
    {
        month: "2015-02-01",
        acc: 14.9
    },
    {
        month: "2015-03-01",
        acc: 17.0
    },
    {
        month: "2015-04-01",
        acc: 20.2
    },
    {
        month: "2015-05-01",
        acc: 55.6
    },
    {
        month: "2015-06-01",
        acc: 56.7
    },
    {
        month: "2015-07-01",
        acc: 30.6
    },
    {
        month: "2015-08-01",
        acc: 63.2
    },
    {
        month: "2015-09-01",
        acc: 24.6
    },
    {
        month: "2015-10-01",
        acc: 14.0
    },
    {
        month: "2015-11-01",
        acc: 9.4
    },
    {
        month: "2015-12-01",
        acc: 6.3
    }
];
const cols = {
    month: {
        alias: "月份"
    },
    acc: {
        alias: "积累量"
    }
};
const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    // style: { padding: 50 },
};
export default class Bzline extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <div className={styles.title}>
                            <span className={styles.lineTitle}>累计用户</span>
                            <span className={styles.lineTitleRight}>2222222日11%</span>
                        </div>
                        <Chart height={400} data={data} scale={cols} padding={[30, 100, 10, 40]} forceFit>
                            <Axis
                                name="month"
                                title='null'
                                tickLine={null}
                                line={{
                                    stroke: "#E6E6E6"
                                }}
                            />
                            <Axis
                                name="acc"
                                line={false}
                                tickLine={null}
                                grid={null}
                                title={null}
                            />
                            <Tooltip />
                            <Geom
                                type="line"
                                position="month*acc"
                                size={1}
                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                shape="smooth"
                                style={{
                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                    shadowBlur: 60,
                                    shadowOffsetY: 6
                                }}
                            />
                        </Chart>
                    </Col>
                    <Col {...topColResponsiveProps} >
                        <div className={styles.title}>
                            <span className={styles.lineTitle}>新增用户</span>
                            <span className={styles.lineTitleRight}>2222222日11%</span>
                        </div>
                        <Chart height={400} data={data} scale={cols} padding={[30, 100, 10, 40]} forceFit>
                            <Axis
                                name="month"
                                title='null'
                                tickLine={null}
                                line={{
                                    stroke: "#E6E6E6"
                                }}
                            />
                            <Axis
                                name="acc"
                                line={false}
                                tickLine={null}
                                grid={null}
                                title={null}
                            />
                            <Tooltip />
                            <Geom
                                type="line"
                                position="month*acc"
                                size={1}
                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                shape="smooth"
                                style={{
                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                    shadowBlur: 60,
                                    shadowOffsetY: 6
                                }}
                            />
                        </Chart>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <div className={styles.title}>
                            <span className={styles.lineTitle}>注册用户</span>
                            <span className={styles.lineTitleRight}>2222222日11%</span>
                        </div>
                        <Chart height={400} data={data} scale={cols} padding={[30, 100, 10, 40]} forceFit>
                            <Axis
                                name="month"
                                title='null'
                                tickLine={null}
                                line={{
                                    stroke: "#E6E6E6"
                                }}
                            />
                            <Axis
                                name="acc"
                                line={false}
                                tickLine={null}
                                grid={null}
                                title={null}
                            />
                            <Tooltip />
                            <Geom
                                type="line"
                                position="month*acc"
                                size={1}
                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                shape="smooth"
                                style={{
                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                    shadowBlur: 60,
                                    shadowOffsetY: 6
                                }}
                            />
                        </Chart>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <div className={styles.title}>
                            <span className={styles.lineTitle}>新注册用户</span>
                            <span className={styles.lineTitleRight}>2222222日11%</span>
                        </div>
                        <Chart height={400} data={data} scale={cols} padding={[30, 100, 10, 40]} forceFit>
                            <Axis
                                name="month"
                                title='null'
                                tickLine={null}
                                line={{
                                    stroke: "#E6E6E6"
                                }}
                            />
                            <Axis
                                name="acc"
                                line={false}
                                tickLine={null}
                                grid={null}
                                title={null}
                            />
                            <Tooltip />
                            <Geom
                                type="line"
                                position="month*acc"
                                size={1}
                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                shape="smooth"
                                style={{
                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                    shadowBlur: 60,
                                    shadowOffsetY: 6
                                }}
                            />
                        </Chart>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <div className={styles.title}>
                            <span className={styles.lineTitle}>活跃用户</span>
                            <span className={styles.lineTitleRight}>2222222日11%</span>
                        </div>
                        <Chart height={400} data={data} scale={cols} padding={[30, 100, 10, 40]} forceFit>
                            <Axis
                                name="month"
                                title='null'
                                tickLine={null}
                                line={{
                                    stroke: "#E6E6E6"
                                }}
                            />
                            <Axis
                                name="acc"
                                line={false}
                                tickLine={null}
                                grid={null}
                                title={null}
                            />
                            <Tooltip />
                            <Geom
                                type="line"
                                position="month*acc"
                                size={1}
                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                shape="smooth"
                                style={{
                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                    shadowBlur: 60,
                                    shadowOffsetY: 6
                                }}
                            />
                        </Chart>
                    </Col>



                </Row>
            </div>

        )
    }
}
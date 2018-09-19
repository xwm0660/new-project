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
import styles from './Bizchartsline.less'
export default class Bizchartsline extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const data1 = [
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
        ];
        const ds = new DataSet();
        const dv = ds.createView().source(this.props.data);
        dv.transform({
            type: "fold",
            fields: this.props.title,
            // 展开字段集
            key: "city",
            // key字段
            value: "temperature" // value字段
        });
        const cols = {
            month: {
                range: [0, 1]
            }
        };
        return (
            <div>
                <Chart height={350} data={dv} scale={cols} padding={[30, 150, 30, 50]} forceFit>
                    <Axis name="day" />
                    <Axis
                        name="temperature"
                        label={{
                            formatter: val => `${val}min`
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                        label={{
                            formatter: val => `${val}次`
                        }}
                    />
                    <Geom
                        type="line"
                        position="month*temperature"
                        size={2}
                        color={this.props.title.length==2?['city', ['gray', 'red']]:['city', ['red']]}
                        shape={"smooth"}
                    />
                </Chart>
                {this.props.title[1] ? <div className={styles.ChartTitle}><span className={styles.lineColor1}></span><span style={{ marginRight: 20 }}>{this.props.title[0]}</span><span className={styles.lineColor2}></span><span>{this.props.title[1]}</span></div>
                    : <div className={styles.ChartTitle}><span className={styles.lineColor1}></span><span style={{ marginRight: 20 }}>{this.props.title[0]}</span></div>
                }
            </div>
        )
    }
}
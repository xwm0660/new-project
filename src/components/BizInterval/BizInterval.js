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
import styles from './BizInterval.less'
export default class BizInterval extends Component {
    render() {
        const data = [
            {
                year: "1951 年",
                sales: 38
            },
            {
                year: "1952 年",
                sales: 52
            },
            {
                year: "1956 年",
                sales: 61
            },
            {
                year: "1957 年",
                sales: 145
            },
            {
                year: "1958 年",
                sales: 48
            },
            {
                year: "1959 年",
                sales: 38
            },
            {
                year: "1960 年",
                sales: 38
            },
            {
                year: "1962 年",
                sales: 38
            }
        ];
        const cols = {
            sales: {
                tickInterval: 20
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} padding={[30, 150, 30, 50]} forceFit>
                    <Axis name="year" />
                    <Axis name="sales" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="year*sales"
                    />

                </Chart>
            </div>
        )
    }
}
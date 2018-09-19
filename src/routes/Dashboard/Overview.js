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
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
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
    Util
} from "bizcharts";
import styles from './Overview.less';
import Bzline from '../../components/Bzline/Bzline'

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Yuan = ({ children }) => (
    <span
        dangerouslySetInnerHTML={{ __html: yuan(children) }} /* eslint-disable-line react/no-danger */
    />
);

@connect(({ chart, loading }) => ({
    chart,
    loading: loading.effects['chart/fetch'],
}))
export default class Overview extends Component {
    state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/fetch',
        });
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    handleChangeSalesType = e => {
        this.setState({
            salesType: e.target.value,
        });
    };

    handleTabChange = key => {
        this.setState({
            currentTabKey: key,
        });
    };

    handleRangePickerChange = rangePickerValue => {
        this.setState({
            rangePickerValue,
        });

        const { dispatch } = this.props;
        dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    selectDate = type => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

        const { dispatch } = this.props;
        dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    isActive(type) {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
    }
    render() {
        const { rangePickerValue, salesType, currentTabKey } = this.state;
        const { chart, loading } = this.props;
        const {
            visitData,
            visitData2,
            salesData,
            searchData,
            offlineData,
            offlineChartData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
        } = chart;

        const salesPieData =
            salesType === 'all'
                ? salesTypeData
                : salesType === 'online'
                    ? salesTypeDataOnline
                    : salesTypeDataOffline;

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );

        const iconGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );

        const salesExtra = (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        今日
          </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        本周
          </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        本月
          </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        全年
          </a>
                </div>
                <RangePicker
                    value={rangePickerValue}
                    onChange={this.handleRangePickerChange}
                    style={{ width: 256 }}
                />
            </div>
        );
        const columns = [
            {
                title: '排名',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '搜索关键词',
                dataIndex: 'keyword',
                key: 'keyword',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '用户数',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
                className: styles.alignRight,
            },
            {
                title: '周涨幅',
                dataIndex: 'range',
                key: 'range',
                sorter: (a, b) => a.range - b.range,
                render: (text, record) => (
                    <Trend flag={record.status === 1 ? 'down' : 'up'}>
                        <span style={{ marginRight: 4 }}>
                            {text}
                            %
            </span>
                    </Trend>
                ),
                align: 'right',
            },
        ];

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

        const CustomTab = ({ data, currentTabKey: currentKey }) => (
            <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
                <Col span={12}>
                    <NumberInfo
                        title={data.name}
                        subTitle="转化率"
                        gap={2}
                        total={`${data.cvr * 100}%`}
                        theme={currentKey !== data.name && 'light'}
                    />
                </Col>
                <Col span={12} style={{ paddingTop: 36 }}>
                    <Pie
                        animate={false}
                        color={currentKey !== data.name && '#BDE4FF'}
                        inner={0.55}
                        tooltip={false}
                        margin={[0, 0, 0, 0]}
                        percent={data.cvr * 100}
                        height={64}
                    />
                </Col>
            </Row>
        );

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 4,
            style: { marginBottom: 24 },
        };
        const curTime = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日' + '   ' + new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())
        return (
            <div>
                <div className={styles.currentTime}>{curTime}</div>
                <div className={styles.chartsDis}>
                    <ChartCard
                        bordered={false}
                        title="累计用户"
                        loading={loading}
                        total={'xxx日新增15%'}
                        //   footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>
                    <ChartCard
                        bordered={false}
                        title="新增用户"
                        loading={loading}
                        total={'xxx日新增15%'}
                        //   footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>
                    <ChartCard
                        bordered={false}
                        title="注册用户"
                        loading={loading}
                        total={'xxx日新增15%'}
                        //   footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>
                    <ChartCard
                        bordered={false}
                        title="新注册用户"
                        loading={loading}
                        total={'xxx日新增15%'}
                        //   footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>
                    <ChartCard
                        bordered={false}
                        title="活跃用户"
                        loading={loading}
                        total={'xxx日新增15%'}
                        //   footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                        contentHeight={46}
                    >
                        <MiniArea color="#975FE4" data={visitData} />
                    </ChartCard>
                </div>
                <Bzline />
            </div >
        );
    }
}

import React from 'react'
import { Card, Col, Row, Tag, Space, Table } from 'antd'
import {
  FlagOutlined,
  SmileOutlined,
  PoundOutlined,
  UserOutlined,
  EllipsisOutlined,
  LikeOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';


import http from '@/utils/http';
import { formatCurrency } from '@/utils'
import  './index.scss'

import { HEAD_BANNER } from './constants'

const UserColumns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: (text, record, index) => {
      switch (index) {
        case 0:
          return <span className="text-light-red">{text}</span>
        case 1:
          return <span className="text-yellow">{text}</span>
        case 2:
          return <span className="text-green">{text}</span>
        default:
          return <span>{text}</span>
      }
    }
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    render: (text) => {
      return (
        <React.Fragment>
          <ClockCircleOutlined />
          <span className="ml-5">{text}</span>
        </React.Fragment>
      )
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return (
        <React.Fragment>
          <span>{record.status === 0 ? '离线' : '在线'}</span>
        </React.Fragment>
      )
    }
  },
  {
    title: '获得赞',
    dataIndex: 'like',
    key: 'like',
    render: (text, record) => {
      return (
        <React.Fragment>
          <span className="mr-5">{record.like}</span>
          <LikeOutlined />
        </React.Fragment>
      )
    }
  }
]

const TaskColumns = [
  {
    title: '任务',
    dataIndex: 'taskName',
    key: 'taskName',
    render: (text, record, index) => {
      switch (index) {
        case 0:
          return <span className="text-light-red">{text}</span>
        case 1:
          return <span className="text-yellow">{text}</span>
        case 2:
          return <span className="text-green">{text}</span>
        default:
          return <span>{text}</span>
      }
    }
  },
  {
    title: '所需时间',
    dataIndex: 'taskTime',
    key: 'taskTime',
  },
  {
    title: '完成状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    render: (text, record, index) => {
      const status = record.taskStatus === 0 ? '已完成' : record.taskStatus === 1 ? '进行中' : '未开始'
      switch (text) {
        case 0:
          return <span className="text-green">{status}</span>
        case 1:
          return <span className="text-yellow">{status}</span>
        case 2:
          return <span className="text-light-red">{status}</span>
        default:
          return <span>{status}</span>
      }
    }
  },
]

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      chart: null,
      date: '1',
      headerBanner: {
        visit: [0, '0万'],
        download: [0, '0%'],
        income: [0, '***'],
        activeUser: [0, '0%']
      },
      chartData: {},
      userTableData: [],
      taskTableData: []
    }
  }

  componentDidMount() {
    // 顶部统计
    http.get('count').then(res => {
      this.setState({
        headerBanner: res
      })
    })
    http.get('user/list').then(res => {
      const list = res.list.slice(0, 7)
      this.setState({ userTableData: list })
    })
    http.get('task/list').then(res => {
      const list = res.list.slice(0, 7)
      this.setState({ taskTableData: list })
    })
  }

  showIcon = (type) => {
    switch (type) {
      case 'Flag':
        return <FlagOutlined />
      case 'Smile':
        return <SmileOutlined />
      case 'Pound':
        return <PoundOutlined />
      case 'User':
        return <UserOutlined />
      default:
        return <EllipsisOutlined />
    }
  }

  render() {
    const { headerBanner, userTableData, taskTableData } = this.state
    return (
      <div className={'page-home'}>
        <div className="header-wrapper">
          <Row gutter={16}>
            {HEAD_BANNER.map(item => (
              <Col span={6} key={item.key}>
                <Card title={item.title} extra={<Tag color={item.tagColor}>{item.tagValue}</Tag>}>
                  <p className={'count'}>{formatCurrency(headerBanner[item.aliasCurrency][0])}</p>
                  <Row justify="space-between">
                    <Col span={12}>
                      <span>{item.desc}</span>
                    </Col>
                    <Col span={12} className="text-right">
                      <Space>
                        <span>{headerBanner[item.aliasCurrency][1]}</span>
                        <span>{this.showIcon(item.icon)}</span>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="home-table mt-20">
          <Row gutter={16}>
            <Col span="12">
              <Card title="本周活跃用户列表">
                <Table columns={UserColumns} className={'table-border'} dataSource={userTableData} pagination={false} />
              </Card>
            </Col>
            <Col span="12">
              <Card title="项目进展">
                <Table columns={TaskColumns} className={'table-border'} dataSource={taskTableData} pagination={false} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Home
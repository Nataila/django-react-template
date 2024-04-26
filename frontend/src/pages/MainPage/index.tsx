import { useEffect, useState } from "react";
import request from '../../request';
import { Button, Form, Input, Table, message } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [data, setData] = useState([])
  const [studentList, setStudentList] = useState([])
  const [config, setConfig] = useState({select_deadline: ''})
  const [search, setSearch] = useState({});
  const [role, setRole] = useState('0')
  const navigate = useNavigate()
  const getData = async () => {
      const res = await request.get('/users/', {params: search})
      setData(res.data)
  }

  const getStudentList = async () => {
    const res = await request.get('/select/')
    setStudentList(res.data)
  }

  const getConfig = async () => {
      const res = await request.get('/config/')
      setConfig(res.data)
  }

  useEffect(() => {
    const role = localStorage.getItem('role')
    setRole(role)
    if (role == '1') {
      getData()
    } else {
      getStudentList()
    }
    getConfig()
  }, [search])

  const goSelect = async (record) => {
    const res = await request.post('/select/', {teacher: record.id})
    message.success('选择成功')
    getData()
  }
  const columns = [
    {title: '老师id', 'dataIndex': 'id', key: 'id'},
    {title: '老师名称', 'dataIndex': 'nickname', key: 'nickname'},
    {title: '院系号', dataIndex: 'department_no', key: 'department_no'},
    {title: '院内编号', dataIndex: 'number', key: 'number'},
    {title: '生日', dataIndex: 'birthday', key: 'birthday'},
    {title: '邮箱', dataIndex: 'email', key: 'email'},
    {title: '教师简介', dataIndex: 'info', key: 'info'},
    {title: '性别', dataIndex: 'gender', key: 'gender'},
    {title: '已选学生数量', dataIndex: 'select_count', key: 'select_count'},
    {
      title: '操作',
      dataIndex: '',
      key: '',
      render: (_, record, index) => {
        return (
          <Button
            onClick={() => {goSelect(record)}}
            type="primary"
            disabled={record.select_count >= config.select_max_count}>选择</Button>
        )
      }
    },
  ]

  const studentColumns = [
    {title: '学生id', 'dataIndex': 'id', key: 'id'},
    {title: '学生名称', 'dataIndex': 'nickname', key: 'nickname'},
    {title: '年级', dataIndex: 'grade', key: 'grade'},
    {title: '年纪子学号', dataIndex: 'grade_number', key: 'grade_number'},
    {title: '生日', dataIndex: 'birthday', key: 'birthday'},
    {title: '邮箱', dataIndex: 'email', key: 'email'},
    {title: '教师简介', dataIndex: 'info', key: 'info'},
    {title: '性别', dataIndex: 'gender', key: 'gender'},

  ]
  const onFinish = (values) => {
    setSearch(values)
  }
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <div style={{padding: '10px 50px'}}>
      <div style={{ position: 'relative'}}>
        <div style={{float: 'right'}}>
          当前角色: {role == '0' ? '教师' : '学生'}
          <span style={{display:'inline-block', marginLeft: 20}}>
            当前用户: {localStorage.getItem('nickname')||''}
          </span>
          <Button style={{ marginLeft: 20}} onClick={logout}>退出</Button>
        </div>
      </div>
      {role == '0' ?
      <>
        <Table dataSource={studentList} columns={studentColumns} pagination={false} />
      </>
      :
      <>
        <h4 style={{ fontSize: 24, padding: 5, textAlign: 'center'}}>老师选择开放中，即将在 {moment(config.select_deadline).format('YYYY-MM-DD kk:mm:ss')} 关闭 </h4>
        <Form name='searchform' layout="inline" onFinish={onFinish}>
        <Form.Item label="院系号" name="department_no">
          <Input />
        </Form.Item>
        <Form.Item label="老师名称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item> <Button type="primary" htmlType="submit">搜索</Button> </Form.Item>
        </Form>
        <Table dataSource={data} columns={columns} pagination={false} />
      </>}
    </div>
  )
}
export default MainPage;

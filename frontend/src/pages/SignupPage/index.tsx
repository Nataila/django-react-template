import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import request from '../../request';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";


const SignupPage = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
      const birthday = values.birthday
      if (!!birthday) {
        const newBirday = moment(birthday).format('YYYY-MM-DD')
        values.birthday = newBirday
      }
      const res = await request.post('/register/', values)
      if ([200, 201].includes(res.status)) {
        navigate('/signin')
      }
  };
  return (
    <div className="signup-root">
      <div style={{minWidth: 600, marginTop: 50}}>
      <h1 style={{textAlign: 'center'}}>注册</h1>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ role: '0', gender: 'm'}}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入登录用户名' }]} >
        <Input />
      </Form.Item>
      <Form.Item label="姓名" name="nickname" rules={[{ required: true, message: '请输入姓名' }]} >
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="角色" name="role">
        <Radio.Group>
          <Radio value="0">教师</Radio>
          <Radio value="1">学生</Radio>
        </Radio.Group>
      </Form.Item>
        <Form.Item label="性别" name="gender">
        <Radio.Group>
          <Radio value="m">男</Radio>
          <Radio value="f">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="邮箱" name="email" >
        <Input />
      </Form.Item>
      <Form.Item label="简介" name="info" ><Input /></Form.Item>
      <Form.Item shouldUpdate noStyle>
      {({ getFieldValue }) =>
          getFieldValue('role') === '0' ? (
            <>
              <Form.Item label="院系号" name="department_no" ><Input /></Form.Item>
              <Form.Item label="院内编号" name="number" ><Input /></Form.Item>
            </>
          ) :
          <>
            <Form.Item label="年级" name="grade" ><Input /></Form.Item>
            <Form.Item label="年级子学号" name="grade_number" ><Input /></Form.Item>
          </>
        }
      </Form.Item>
      <Form.Item label="生日" name="birthday" >
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            注册
        </Button>
        <div style={{ marginTop: 12}}><Link to='/signin'>去登录</Link></div>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}
export default SignupPage;

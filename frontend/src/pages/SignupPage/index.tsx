import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import request from '../../request';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { RegisterReq } from "../../services/accounts";


const SignupPage = () => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
      const birthday = values.birthday
      if (!!birthday) {
        const newBirday = moment(birthday).format('YYYY-MM-DD')
        values.birthday = newBirday
      }
      await RegisterReq(values)
      navigate('/signin')
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
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="确定密码" name="password2" rules={[{ required: true, message: '请确认密码' }]}>
        <Input.Password />
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

import { Button, Form, FormProps, Input, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import request from "../../request";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

const SigninPage = () => {
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await request.post('/login/', values)
    localStorage.setItem('token', res.access)
    localStorage.setItem('role', res.role)
    localStorage.setItem('username', res.username)
    localStorage.setItem('nickname', res.nickname)
    message.success('登录成功')
    navigate('/')
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="login-root">
    <div className="login-form">
    <h1 style={{textAlign: 'center'}}>登录</h1>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">登录</Button>
        <div style={{ marginTop: 12}}>没有账号？<Link to='/signup'>注册账号</Link></div>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}
export default SigninPage;

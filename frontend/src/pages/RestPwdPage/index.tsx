import { Button, Form, Input, message } from "antd"
import request from "../../request";

const RestPwdPage = () => {

  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const res = await request.put('/accounts/resetpwd/', values)
    form.resetFields()
    message.success('操作成功')
  };

  return (
    <div>
      <h2>修改密码</h2>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="旧密码"
          name="old_password"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="new_password"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="new_password2"
          rules={[{ required: true, message: '请确认新密码' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RestPwdPage

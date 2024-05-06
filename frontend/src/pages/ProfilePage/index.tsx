import { useEffect, useState } from "react";
import request from "../../request";
import { Button, Form, Input, message } from "antd";

const ProfilePage = () => {
  const [data, setData] = useState({})

  const [form] = Form.useForm()

  const getProfile = async () => {
    const res = await request.get('/accounts/user/')
    setData(res)
    form.setFieldsValue(res)
  }

  const onFinish = async (values) => {
    const res = await request.put('/accounts/user/', values)
    message.success('修改成功')
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
    <h2>个人资料</h2>
    <div>
      <Form
        form={form}
        name="editForm"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  )
}

export default ProfilePage;
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const history = useHistory();
  const account = { username: "admin", password: "admin" };
  const onFinish = (value) => {
    console.log(value);
    if (JSON.stringify(value) === JSON.stringify(account)) {
      console.log(value);
      history.push("/");
    }
  };
  return (
    <div className="layout">
      <div className="container">
        <div className="containerHeader"></div>
        <div className="header">Change Academy</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;

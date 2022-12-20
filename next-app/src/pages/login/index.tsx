import { login } from "@/actions";
import Layout from "@/components/layout";
import { Button, Form, Input } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();

  const onFinish = async (form: ILoginForm) => {
    await login(form["username"], form["password"]);
    router.push("/home");
  };

  return (
    <>
      <div>
        <Head>
          <title>Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout title="Login" backable hideAuthSection>
        <div className="h-full flex flex-col justify-center">
          <Form
            name="login"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 6 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10 }}>
              <Button type="primary" htmlType="submit" className="w-24">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;

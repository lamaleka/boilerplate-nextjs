"use client";

import { appVersion, ROUTES } from "@/constants";
import { useCreateSession } from "@/hooks";
import { useLogin } from "@/presenter";
import { LoginOne, LoginRequest, SessionData } from "@/type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Col, Divider, Flex, Form, Input, Row, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const redirectParamRef = useRef(searchParams.get("redirect"));
  const messageRef = useRef(message);
  const [form] = Form.useForm<LoginRequest>();
  const { isPending: isLoggingIn, mutate: login } = useLogin();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isCreatingSession, mutate: createSession } = useCreateSession();

  const onFinish = (v: LoginRequest) => {
    login(LoginRequest.asPayload(v), {
      onSuccess: (data: LoginOne) => {
        newSession(data.data);
      },
    });
  };
  const ssoHref = useMemo(() => {
    let redirect: string = ROUTES.sso;
    if (redirectParamRef.current) {
      redirect = atob(redirectParamRef.current);
    }
    return `${process.env.NEXT_PUBLIC_SSO_API_URL}/api/login?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/sso?redirect=${redirect}`;
  }, []);

  const newSession = (data: SessionData) => {
    createSession(data, {
      onSuccess: () => {
        messageRef.current.success({
          content: "Login Successful",
          duration: 0.8,
        });
        queryClient.clear();
        let redirectUrl: string = ROUTES.dashboard;
        if (redirectParamRef.current) {
          redirectUrl = atob(redirectParamRef.current);
        }
        router.replace(redirectUrl);
      },
    });
  };

  return (
    <Spin spinning={isLoggingIn || isCreatingSession}>
      <Row justify="space-between" style={{ height: "100vh", width: "100vw" }}>
        <Col
          xs={24}
          sm={24}
          md={12}
          xl={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "400px",
            minHeight: "600px",
            backgroundImage: "url('/images/abstract_1.png')",
            // backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Flex style={{ width: "100%" }} vertical>
            <h1 style={{ textAlign: "center", marginBottom: 0 }}>Your Title Here</h1>
            <span style={{ textAlign: "center", marginBottom: "12px" }}>Login with username or SSO</span>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} size="large" placeholder="Masukkan Username" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined />} visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} size="large" placeholder="Password" type="password" />
              </Form.Item>
              <Button loading={isLoggingIn} size="large" htmlType="submit" type="primary" style={{ width: "100%", marginTop: "12px" }}>
                Login
              </Button>
            </Form>
            <Divider plain>Atau</Divider>
            <Button size="large" type="default" variant="outlined" color="blue" style={{ width: "100%" }} href={ssoHref}>
              Login dengan SSO
            </Button>
            <div style={{ textAlign: "center", margin: "10px 0px", color: "grey" }}>v{appVersion}</div>
          </Flex>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          xl={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "#f0f0f0",
            height: "100vh",
            minHeight: "600px",
            backgroundImage: "url('/images/bg_login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <Image
                preview={false}
                src="/images/login_bg.jpg"
                alt="Example Icon"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              /> */}
        </Col>
      </Row>
    </Spin>
  );
}

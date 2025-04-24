"use client";
import { ROUTES } from "@/constants";
import { useCreateSession, useDestroySession } from "@/hooks";
import { useVerifySSOMutation } from "@/presenter";
import { Failure, SessionData } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { App, Spin, Typography } from "antd";
import { Flex } from "antd/lib";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const { Text } = Typography;

export default function AuthCallback() {
  const { message } = App.useApp();
  const messageRef = useRef(message);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const redirectParamRef = useRef(searchParams.get("redirect"));
  const router = useRouter();
  const { mutate: createSession } = useCreateSession();
  const { mutate: destroySession } = useDestroySession();
  const { mutate: verifySSO } = useVerifySSOMutation();

  const createNewSession = (data: SessionData) => {
    createSession(data, {
      onSuccess: () => {
        queryClient.clear();
        messageRef.current.success({
          content: "Login Successful",
          duration: 0.8,
        });
        const redirectUrl = redirectParamRef.current ?? ROUTES.dashboard;
        router.replace(redirectUrl);
      },
      onError: (e: Error) => {
        const error = e as Failure;
        messageRef.current.error({
          content: error.message,
          duration: 2,
        });
        destroySession();
        router.replace(ROUTES.auth.login);
      },
    });
  };
  const createNewSessionRef = useRef(createNewSession);
  const verifySSORef = useRef(verifySSO);

  useEffect(() => {
    verifySSORef.current(undefined, {
      onSuccess: (data) => createNewSessionRef.current(data?.data),
      onError: (e: Error) => {
        const error = e as Failure;
        messageRef.current.error({
          content: `Login failed, ${error.message}`,
          duration: 2,
        });
        router.replace(ROUTES.auth.login);
      },
    });
  }, [router]);

  return (
    <Flex align="center" justify="center" style={{ width: "100%", height: "100vh" }} gap={12} vertical>
      <Spin spinning={true} />
      <Text>Checking your session, please wait ...</Text>
    </Flex>
  );
}

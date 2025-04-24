"use client";
import { ROUTES } from "@/constants";
import { useCreateSession, useDestroySession, useGetSession } from "@/hooks";
import { SessionData } from "@/type";
import { Flex, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AuthCheckPage() {
  const { data: session } = useGetSession();
  const { mutate: createSession } = useCreateSession();
  const { mutate: destroySession } = useDestroySession();
  const destroySessionRef = useRef(destroySession);
  const router = useRouter();
  useEffect(() => {
    fetch("/auth/api/check").then(async (res) => {
      const data = (await res.json()) as SessionData;
      if (data?.is_authenticated) {
        if (!session) {
          createSession(data);
        }
        router.replace(ROUTES.dashboard);
      } else {
        destroySessionRef.current(undefined, {
          onSuccess() {
            router.replace(ROUTES.auth.login);
          },
        });
      }
    });
  }, [createSession, session, router]);
  return (
    <Flex align="center" justify="center" style={{ width: "100%", height: "100vh" }} gap={12} vertical>
      <Spin spinning={true} />
      <Typography.Text>Checking your session, please wait ...</Typography.Text>
    </Flex>
  );
}

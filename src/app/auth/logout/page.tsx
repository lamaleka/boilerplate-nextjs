"use client";
import { ROUTES } from "@/constants";
import { useDestroySession } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Spin, Typography } from "antd";
import { Flex } from "antd/lib";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const { Text } = Typography;

export default function LogoutPage() {
  const searchParams = useSearchParams();
  const redirectParamRef = useRef(searchParams.get("redirect") ?? "");
  const queryClient = useQueryClient();
  const queryClientRef = useRef(queryClient);
  const router = useRouter();
  const { mutate: destroySession } = useDestroySession();
  const destroySessionRef = useRef(destroySession);

  useEffect(() => {
    destroySessionRef.current(undefined, {
      onSuccess: () => {
        if (redirectParamRef.current) {
          queryClientRef.current.clear();
          router.replace(`${ROUTES.auth.login}?redirect=${redirectParamRef.current}`);
        } else {
          router.replace(ROUTES.auth.login);
        }
      },
      onError: () => window.history.back(),
    });
  }, [router]);

  return (
    <Flex align="center" justify="center" style={{ width: "100%", height: "100vh" }} gap={12} vertical>
      <Spin spinning={true} />
      <Text>Logging out, please wait ...</Text>
    </Flex>
  );
}

"use client";

import React from "react";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { themeConfig } from "../config/index.config";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import idID from "antd/locale/id_ID";
import { ReactQueryProvider } from "@/lib";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <ReactQueryProvider>
        <ConfigProvider theme={themeConfig} locale={idID}>
          <AntdRegistry>
            <ErrorBoundary>{children}</ErrorBoundary>
          </AntdRegistry>
        </ConfigProvider>
      </ReactQueryProvider>
    </App>
  );
}

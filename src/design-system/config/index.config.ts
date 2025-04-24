import { type ThemeConfig } from "antd";
export const themeConfig: ThemeConfig = {
  hashed: false,
  token: {},
  components: {
    Menu: {
      itemBg: "#014188",
      itemColor: "#fff",
      itemSelectedBg: "#fff",
      itemSelectedColor: "#014188",
      itemHoverColor: "#014188",
      itemHoverBg: "#fff",
    },
    Input: {
      controlHeight: 32,
    },
    InputNumber: {
      controlHeight: 32,
    },
    DatePicker: {
      controlHeight: 32,
    },
    Select: {
      controlHeight: 32,
    },
    Button: {
      // controlHeight: 30,
    },
    Layout: {
      siderBg: "#fff",
      headerBg: "#fff",
    },
  },
};

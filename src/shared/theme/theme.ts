import { theme } from "antd";

const lightTheme = {
  cssVar: true,
  token: {
    colorPrimary: "#fec10d",
    colorInfo: "#fec10d",
  },
  components: {
    Layout: {
      triggerColor: "#000000",
      triggerBg: "#fec10d",
    },
    Button: {
      algorithm: true,
    },
  },
};

const darkTheme = {
  cssVar: true,
  token: {
    colorPrimary: "#fec10d",
    colorInfo: "#fec10d",
  },
  components: {
    Layout: {
      triggerColor: "#000000",
      triggerBg: "#fec10d",
    },
    Button: {
      colorBgContainer: "#fec10d",
      colorText: "#000000",
      algorithm: true,
    },
  },
  algorithm: theme.darkAlgorithm,
};

export { lightTheme, darkTheme };

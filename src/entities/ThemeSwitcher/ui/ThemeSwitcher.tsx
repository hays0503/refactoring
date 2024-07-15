'use client';
import useTheme from "@/shared/hook/useTheme";
import { MoonOutlined,BulbOutlined } from '@ant-design/icons';
import { Switch } from "antd";

export default function ThemeSwitcher() {

  const {CurrentTheme,isDarkMode,toggleDarkMode,isDarkTheme} = useTheme()

  return <div>
        <Switch
          defaultChecked={isDarkMode}
          checked={!isDarkMode}
          onChange={toggleDarkMode}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<MoonOutlined />}
        />
      </div>
}

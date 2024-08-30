
import { CollapseProps, Collapse } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import {
  selectDataByLangNameSpecification,
  selectDataByLangValueSpecification,
} from "@/shared/tool/selectDataByLang";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { Specification } from "@/shared/types/specification";
import ucFirst from "@/shared/tool/ucFirst";
import { revalidateConfig } from "@/shared/config/revalidateConfig";

const { Title, Text } = Typography;

const SpecificationsBody = (
  specifications: Specification[]
): DescriptionsProps["items"] => {
  const localActive = useLocale();
  return specifications.map((item) => {
    return {
      label: ucFirst(selectDataByLangNameSpecification(item,localActive)),
      children: ucFirst(selectDataByLangValueSpecification(item,localActive)),
    };
  });
};

export default function Specifications({ productId }: { productId: number }) {
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const t = useTranslations();
  const localActive = useLocale();
  const CollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: t("kharakteristiki"),
      children: (
        <Descriptions
          bordered
          size="small"
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{ fontWeight: "normal", fontStyle: "italic"}} 
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={SpecificationsBody(specifications)}
        />
      ),
    },
  ];

  useEffect(() => {
    fetch(`/api/v1/specif/filter_by_prod/${productId}`,{
      next: revalidateConfig["/api/v1/specif/filter_by_prod"],
    }).then((response) =>
      response.json().then((data)=>setSpecifications(data)));    
  }, [productId]);

  return (
    <Collapse
      items={CollapseItems}
      bordered={false}
      defaultActiveKey={["1"]}
      style={{ width: "100%" }}
    />
  );
}

import { iDescription } from "@/shared/types/descriptionProduct";
import { CollapseProps, Collapse } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Flex, Typography } from "antd";
import { selectDataByLangDescriptionBody, selectDataByLangDescriptionTitle } from "@/shared/tool/selectDataByLang";

const { Title, Text } = Typography;

const DescriptionBody = ({
  title_description,
  body_description,
}: {
  title_description: string;
  body_description: string;
}) => {
  return (
    <Flex align="flex-start" justify="flex-start" vertical={true}>
      <Title level={5}>{title_description}</Title>
      <Text>{body_description}</Text>
    </Flex>
  );
};

export default function Description({ productId }: { productId: number }) {
  const [description, setDescription] = useState<iDescription[]>([]);
  const t = useTranslations();
  const localActive = useLocale();
  const CollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: t("opisanie"),
      children: description.map((item,index) => {
        return (
          <div key={index}>
            <DescriptionBody
              key={item.id}
              title_description={selectDataByLangDescriptionTitle(item,localActive)}
              body_description={selectDataByLangDescriptionBody(item,localActive)}
            />
          </div>
        );
      }),
    },
  ];

  useEffect(() => {
    fetch(`/api/v1/descrip/filter_by_prod/${productId}`,{
      next: { revalidate: 60 },
    }).then((response) =>
      response.json().then(setDescription)
    );
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

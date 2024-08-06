import { iDescription } from "@/shared/types/descriptionProduct";
import { CollapseProps, Collapse } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { Flex, Typography } from "antd";
import {
  selectDataByLangDescriptionBody,
  selectDataByLangDescriptionTitle,
} from "@/shared/tool/selectDataByLang";

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

export default function Description({
  productDescription,
}: {
  productDescription: iDescription;
}) {
  // const [description, setDescription] = useState<iDescription[]>([]);
  const t = useTranslations();
  const localActive = useLocale();
  const CollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: t("opisanie"),
      children: (
        <DescriptionBody
            title_description={selectDataByLangDescriptionTitle(
            productDescription,
            localActive
          )}
            body_description={selectDataByLangDescriptionBody(
            productDescription,
            localActive
          )}
        />
      ),
    },
  ];

  return (
    <Collapse
      items={CollapseItems}
      bordered={false}
      defaultActiveKey={["1"]}
      style={{ width: "100%" }}
    />
  );
}

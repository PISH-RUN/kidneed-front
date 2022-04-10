import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { useContent, useSearchContents } from "../../api/activity";
import { MdInfo } from "react-icons/md";
import { ContentDetail } from "../contentDetail/contentDetail";

export const ContentSearch = ({ type, value, onChange }: any) => {
  const [search, setSearch] = useState("");
  const [selectedContent, setContent] = useState();
  const [options, setOptions] = useState<any>([]);
  const { mutateAsync: getContents, isLoading } = useSearchContents();
  const { data: content } = useContent(selectedContent);
  const { data: contentValue } = useContent(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setOptions([]);
      getContents({ search, type }).then(resp =>
        setOptions(
          resp?.data?.map((content: any) => ({
            value: content.id,
            label: content.attributes?.title
          }))
        )
      );
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, type]);

  useEffect(() => {
    if (value && !options.find((option: any) => option.value === value)) {
      setOptions((prev: any) => ([
        ...prev,
        {
          value,
          label: contentValue?.data?.attributes?.title
        }
      ]));
    }
  }, [options, value]);

  return (
    <div className="tw-flex tw-items-center">
      <Select
        filterOption={false}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        options={options}
        placeholder="جستجو محتوا"
        value={value}
        onChange={onChange}
        showSearch
        onSearch={(value) => setSearch(value)}
      />
      <MdInfo
        onClick={() => setContent(value)}
        className={`${!value ? "tw-text-gray-400" : "tw-text-blue-400 tw-cursor-pointer"} tw-text-3xl tw-mr-2`}
      />
      <ContentDetail
        visible={!!selectedContent && !!content?.data}
        content={content?.data}
        onCancel={() => setContent(undefined)}
      />
    </div>
  );
};
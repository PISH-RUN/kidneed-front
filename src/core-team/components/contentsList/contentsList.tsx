import styles from "../../../earth/styles/earth.module.css";
import { Avatar, Col, Modal, Row } from "antd";
// @ts-ignore
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
import { useContent, useSearchContent, useSearchContents } from "../../api/activity";
import { Box, Button, Card, CircularProgress, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoIcon from "../../../layouts/icons/video";
import MusicIcon from "../../../layouts/icons/music";
import ActivityIcon from "../../../layouts/icons/activity";
import GameIcon from "../../../layouts/icons/game";
import BookIcon from "../../../layouts/icons/book";
import _ from "lodash";
import { ContentDetail } from "../contentDetail/contentDetail";
import { MdInfo } from "react-icons/md";

const cardImage = {
  backgroundSize: "cover",
  backgroundColor: "#f0f0f0",
  overflow: "hidden",
  border: "none",
  backgroundRepeat: "no-repeat",
  width: 200,
  height: 220,
  cursor: "pointer"
};

const typeIcons: any = {
  "video": VideoIcon,
  "audio": MusicIcon,
  "activity": ActivityIcon,
  "game": GameIcon,
  "book": BookIcon
};

const ItemPic = ({ content, type }: any) => {
  const Icon = typeIcons[type];

  const getPoster = (content: any) => {
    return content?.attributes?.poster?.data?.attributes?.url;
  };

  if (getPoster(content)) {
    return <Box
      className="tw-w-full tw-h-full"
      sx={{
        ...cardImage,
        backgroundImage: `url("${getPoster(content)}")`,
        backgroundSize: "cover"
      }}
    >
      <Avatar className="tw-w-full tw-h-full tw-rounded-2xl" src={getPoster(content)} />
    </Box>;
  }

  console.log(content?.attributes?.title, type, Icon);
  return (
    <Box sx={cardImage} className="tw-items-center tw-flex tw-justify-center tw-w-full tw-h-full">
      {Icon && <Icon
        className={`tw-text-gray-400 !tw-w-28 !tw-h-28 ${type !== "game" && "!tw-fill-transparent"}`}
        style={{ stroke: "#8CA3A5" }}
      />}
    </Box>
  );
};

const ContentCard = ({ content, type, onClick, onSelect }: any) => {
  const data = {
    id: content.id,
    ...content.attributes
  };

  return (
    <Card className="tw-group">
      <div className="tw-group tw-relative">
        <ItemPic content={content} type={type} />
        <div className="tw-absolute tw-flex-col !tw-hidden group-hover:!tw-flex tw-w-full tw-h-full tw-left-0 tw-top-0 tw-justify-center tw-items-center tw-bg-gray-900 tw-bg-opacity-80">
          <Typography className="tw-font-bold !tw-mb-4 !tw-text-sm !tw-text-white">{data?.title}</Typography>
          <Button
            onClick={onSelect}
            className="tw-h-fit !tw-text-white !tw-border-white"
            variant="outlined"
          >انتخاب</Button>
        </div>
      </div>
      <Box className="tw-p-4 tw-px-2 tw-flex tw-relative">
        <Typography className="!tw-h-[20px] !tw-overflow-hidden !tw-font-bold tw-pl-6 !tw-text-sm">{data?.title}</Typography>
        <MdInfo
          onClick={onClick}
          className="tw-text-blue-400 tw-cursor-pointer tw-text-3xl tw-mr-2 tw-absolute tw-left-2 tw-top-3"
        />
      </Box>
    </Card>
  );
};

export const ContentsList = ({ type, value, onChange, ...rest }: any) => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedContent, setContent] = useState();
  const { data: content } = useContent(selectedContent);
  const { data: contents, isLoading } = useSearchContent(search, type);
  const { data: contentValue, isLoading: isValueLoading } = useContent(value);

  const handleSearch = _.debounce((event) => setSearch(event.target.value), 1000);

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-between">
        {value &&
          <>
            {isValueLoading && <LinearProgress className="tw-w-32 tw-ml-4" />}
            <Typography className="!tw-h-[20px] !tw-ml-3 !tw-overflow-hidden !tw-font-bold !tw-text-sm">
              {contentValue?.data?.attributes?.title}
            </Typography>
          </>}
        <div>
          {value && <Button size="small" variant="outlined" className="!tw-ml-3" onClick={() => setContent(value)}>
            جزئیات محتوا
          </Button>}
          <Button variant="contained" size="small" onClick={() => setModal(true)}>
            {value ? "تغییر محتوا" : "جستجو محتوا"}
          </Button>
        </div>
      </div>
      <Modal
        footer={false}
        closable={true}
        maskClosable
        visible={modal}
        {...rest}
        onCancel={() => setModal(false)}
        destroyOnClose
        className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden !tw-w-[1200px] !tw-top-4"}
      >
        <div className={styles.allContent}>
          <div className={styles.header}>
            انتخاب محتوا
          </div>
          <Box className="tw-px-8 tw-py-10">
            <Box>
              <TextField
                fullWidth
                label="عنوان محتوا"
                onChange={handleSearch}
              />
            </Box>
            <div
              className="tw-overflow-y-auto tw-overflow-x-hidden tw-my-5 tw-min-h-[400px]"
              style={{ maxHeight: "calc(100vh - 320px)" }}
            >
              <Row justify="space-around" gutter={[15, 30]}>
                {contents?.data?.map((content: any) => (
                  <Col flex="200px" key={content?.id}>
                    <ContentCard
                      onSelect={() => {
                        onChange(content.id);
                        setModal(false);
                      }}
                      content={content}
                      type={type}
                      onClick={() => setContent(content?.id)}
                    />
                  </Col>
                ))}
                {isLoading &&
                  <>
                    <CircularProgress className="tw-absolute tw-left-1/2 tw-top-1/2" />
                  </>
                }
              </Row>
            </div>
          </Box>
        </div>
      </Modal>

      <ContentDetail
        visible={!!selectedContent && !!content?.data}
        content={content?.data}
        onCancel={() => setContent(undefined)}
      />
    </>
  );
};
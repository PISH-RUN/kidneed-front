import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid, IconButton, ListItem,
  ListItemIcon, ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Image from "next/image";
import LogoImage from "../public/images/logo.png";
import DashboardIcon from "layouts/icons/dashboard";
import BaseLayout from "./baseLayout";
import CalendarIcon from "layouts/icons/calendar";
import TelescopeIcon from "layouts/icons/telescope";
import GiftIcon from "layouts/icons/gift";
import BulbIcon from "layouts/icons/bulb";
import ChatBubbleIcon from "layouts/icons/chatBubble";
import Basket from "layouts/icons/basket";
import SettingIcon from "layouts/icons/setting";
import { useRouter } from "next/router";
import Link from "next/link";
import ArrowDown from "./icons/arrow-down";
import { useApp } from "@kidneed/hooks";
import { Models } from "@kidneed/types";
import { DateRange, LocalizationProvider, StaticDateRangePicker } from "@mui/lab";
import JalaliUtils from "@date-io/jalaali";
import jMoment from "moment-jalaali";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { Modal, notification } from "antd";
import { useDeleteChild } from "../core-team/api/user";
import { IoHome, IoNewspaper } from "react-icons/io5";
import { BLOG_URL } from "../core-team/constants";

notification.config({
  placement: "bottomLeft"
});

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

export type ParentDashboardLayoutProps = {
  children: React.ReactNode;
  Header?: React.ReactNode;
  showChild?: boolean | "header";
  showRange?: boolean;
  onRangeChange?: (range: DateRange<Date>) => void;
  SideComponent?: React.ReactNode;
  bp?: number
  bd?: string
};

const today: DateRange<Date> = [new Date(), new Date()];

const DATE_SIZE = 28;
const DATE_SIZE2 = 36;

const styles = {
  navButton: {
    px: 4,
    py: 3,
    borderRadius: 3,
    width: "100%",
    fontSize: 20,
    justifyContent: "left",
    "& svg": {
      fontSize: "28px!important",
      mr: 1
    },
    color: "#8CA3A5"
  },
  activeNavButton: {
    color: "#fff"
  }
};

const menu = [
  {
    title: "داشبورد",
    link: "/parent/dashboard",
    icon: <DashboardIcon />
  }, {
    title: "از همه رنگ",
    link: "/parent/dayPlan",
    icon: <CalendarIcon />
  }, {
    title: "رصدخونه",
    link: "/parent/workView",
    icon: <TelescopeIcon />
  }, {
    title: "راه چه",
    link: "/parent/rahche",
    icon: <BulbIcon />
  }, {
    title: "پیام ها",
    type: "notification",
    link: "/parent/message",
    icon: <ChatBubbleIcon />
  }, {
    title: "اشتراک",
    link: "/parent/subscription",
    icon: <Basket />
  }, {
    title: "تنظیمات",
    link: "/parent/setting",
    icon: <SettingIcon />
  },
  {
    type: "divider",
    link: "/",
  },
  {
    title: "صفحه اصلی",
    link: "https://yekodo.ir",
    external: true,
    icon: <IoHome />
  }, {
    title: "بلاگ",
    link: BLOG_URL,
    external: true,
    icon: <IoNewspaper />
  },
  {
    link: "/",
    type: "divider"
  },
  {
    title: "خروج",
    type: "logout",
    link: "/login",
    icon: <FiLogOut />
  }
];

const NavBar = () => {
  const { pathname, ...router } = useRouter();
  const { ctx, logout } = useApp();

  // @ts-ignore
  const isSelectedMenu = (link) => {
    return (pathname.indexOf(link) !== -1);
  };

  const handleClickMenu = (link: string) => router.push(link);

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2
      }}
    >
      <Box sx={{ maxWidth: 210, p: 2, margin: "0 auto" }}>
        <Link href="/">
          <Image src={LogoImage} alt="logo" className="tw-cursor-pointer" />
        </Link>
      </Box>
      <Box sx={{ mt: 5 }}>
        {/*@ts-ignore*/}
        {menu.map((m, index) =>
          m.type === "divider" ?
            <Divider /> :
            <Link key={index} href={m.link}>
              <Button
                sx={{ ...styles.navButton, ...(isSelectedMenu(m.link) ? styles.activeNavButton : {}) }}
                variant={isSelectedMenu(m.link) ? "contained" : "text"}
                startIcon={m.icon}
                onClick={() => m.type === "logout" && logout()}
              >
                {m.title}
                {(m.type === "notification" && !!ctx?.user?.unreadNotifications && ctx?.user?.unreadNotifications > 0) &&
                  <span className={`tw-text-sm tw-rounded-full tw-text-white tw-bg-orange-500 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-mr-4`}>{ctx?.user?.unreadNotifications}</span>}
              </Button>
            </Link>
        )}
      </Box>
    </Box>
  );
};

const ChildSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { ctx, selectChild, deleteChild } = useApp();
  const { mutateAsync: deleteChildRequest } = useDeleteChild();
  const router = useRouter();

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectChild = (child: Models.Child) => {
    console.log(child);
    selectChild(child);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteChild = (child: Models.Child) => {
    setAnchorEl(null);
    Modal.confirm({
      title: `حذف ${child?.name}`,
      content: `آیا از حذف ${child?.name} مطمئن هستید؟`,
      direction: "rtl",
      okButtonProps: {
        className: "tw-bg-blue-500"
      },
      onOk: async () => {
        deleteChildRequest(child.id).then(() => {
          notification.success({
            message: "حذف با موفقیت انجام شد"
          });
          deleteChild(child.id);
          if (ctx?.children && ctx?.children.length <= 1) {
            router.push("/add-child");
          }
        });
      }
    });
  };

  return (
    <>
      <Stack
        onClick={handleOpen}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ py: 2, px: 2, cursor: "pointer" }}
      >
        <Avatar
          sx={{ width: 80, height: 80, p: 2, background: "#E2F1FD" }}
          src={ctx?.child?.gender === "boy" ? "/images/avatar-man.png" : "/images/avatar-woman.png"}
        />
        <Box flexGrow={1}>
          {ctx.child &&
            <span className="tw-text-xl tw-font-bold">{ctx.child.gender === "boy" ? `آقا ${ctx.child.name}` : `${ctx.child.name} خانم`}</span>
          }
        </Box>
        <Box>
          <ArrowDown sx={{ color: "#8CA3A5", fontSize: 16 }} />
        </Box>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
        PaperProps={{
          sx: {
            minWidth: 280
          }
        }}
      >
        {ctx.children?.map(c => (
          <MenuItem
            key={c.id}
            selected={ctx.child?.id === c.id}
            onClick={(e) => {
              e.stopPropagation();
              console.log(c);
              handleSelectChild(c);
            }}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChild(c);
                  }}
                  size="small" edge="end" aria-label="حذف"
                >
                  <FiTrash2 className="tw-text-red-500" />
                </IconButton>
              }
            >
              {c.name}
            </ListItem>
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => router.push("/add-child?step=add")}
        >
          <ListItemIcon>
            <FaPlus />
          </ListItemIcon>
          افزودن فرزند
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => router.push("/child/dashboard")}
        >
          <ListItemIcon>
            <FaSignOutAlt />
          </ListItemIcon>
          ورود به محیط کودک
        </MenuItem>
      </Menu>
    </>
  );
};

export default function ParentDashboardLayout(props: ParentDashboardLayoutProps) {
  const { children, SideComponent, showChild, showRange, onRangeChange, Header, bp, bd } = props;
  const [range, setRange] = useState<DateRange<Date>>(today);
  const { ctx } = useApp();
  const isChild = localStorage.getItem("isChild");

  useEffect(() => {
    if (range[0] !== null && range[1] !== null) {
      onRangeChange && onRangeChange(range);
    }
  }, [range]);

  useEffect(() => {
    if (isChild) {
      location.href = "/child/dashboard";
    }
  }, [isChild]);

  if (isChild || (!ctx.child && ctx.children)) {
    return <></>;
  }

  return <BaseLayout>
    <Grid container spacing={0}>
      <Grid item sx={{ width: 300 }}>
        <NavBar />
      </Grid>
      <Grid item xs>
        {(Header || showChild === "header") &&
          <Box className={`tw-flex tw-pt-5 tw-items-center ${!!Header && showChild === "header" ? "tw-justify-between" : "tw-justify-end"}`}>
            {Header && Header}
            {showChild === "header" && <Box sx={{ minWidth: 250 }}><ChildSelector /></Box>}
          </Box>}
        <Box
          sx={{
            display: bd,
            borderRadius: 6, p: bp !== undefined ? bp : 2, mt: 2, background: "#F5F9F8", minHeight: "90vh",
            mr: (showChild !== true && !SideComponent) ? 2 : 0
          }}
        >
          {children}
        </Box>
      </Grid>
      {(showChild === true || !!SideComponent) &&
        <Grid item sx={{ width: { xl: 300, xs: 250 } }}>
          {showChild === true && <ChildSelector />}
          {showRange &&
            <Box
              sx={{
                "& > div": {
                  minWidth: 250
                },
                "& > div > div, & > div > div > div, & .MuiCalendarPicker-root": {
                  width: { xl: 300, xs: 250 }
                },
                "& .MuiTypography-caption": {
                  width: 40,
                  margin: 0
                },
                "& .PrivatePickersSlideTransition-root": {
                  minHeight: { xl: DATE_SIZE2 * 7, xs: DATE_SIZE * 7 },
                  minWidth: 250
                },
                "& .PrivatePickersSlideTransition-root [role=\"row\"]": {
                  margin: 0
                },
                "& .MuiPickersDay-dayWithMargin": {
                  margin: 0
                },
                "& .MuiPickersDay-root": {
                  width: { xl: DATE_SIZE2, xs: DATE_SIZE },
                  height: { xl: DATE_SIZE2, xs: DATE_SIZE }
                },
                "& .MuiDateRangePickerDay-rangeIntervalDayHighlight + .MuiDateRangePickerDay-rangeIntervalDayHighlightEnd": {
                  background: "#aed6fa"
                }
              }}
            >
              <LocalizationProvider dateAdapter={JalaliUtils}>
                <StaticDateRangePicker
                  showToolbar={false}
                  value={range}
                  onChange={(value) => {
                    if (value[0] === null || value[1] === null) {
                      setRange(value);
                    } else if (range[0] === null || range[1] === null) {
                      setRange(value);
                    } else if (range[0] !== null && range[1] !== null && value[0] !== null && value[1] !== null) {
                      setRange([value[0], null]);
                    }
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Box>
          }
          {SideComponent}
        </Grid>
      }
    </Grid>
  </BaseLayout>;
}

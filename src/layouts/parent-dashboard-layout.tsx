import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItemIcon,
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
    title: "کارنما",
    link: "/parent/workView",
    icon: <TelescopeIcon />
  }, {
    title: "بچه زرنگ",
    link: "/parent/dashboard3",
    icon: <GiftIcon />
  }, {
    title: "راه چه",
    link: "/parent/approach",
    icon: <BulbIcon />
  }, {
    title: "پیام ها",
    link: "/parent/message",
    icon: <ChatBubbleIcon />
  }, {
    title: "تنظیمات",
    link: "/parent/setting",
    icon: <SettingIcon />
  }
];

const NavBar = () => {
  const { pathname, ...router } = useRouter();

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
      <Box sx={{ maxWidth: 210, p: 2, margin: "0 auto" }}><Image src={LogoImage} alt="logo" /></Box>
      <Box sx={{ mt: 5 }}>
        {/*@ts-ignore*/}
        {menu.map((m, index) =>
          <Link key={index} href={m.link}>
            <Button
              sx={{ ...styles.navButton, ...(isSelectedMenu(m.link) ? styles.activeNavButton : {}) }}
              variant={isSelectedMenu(m.link) ? "contained" : "text"}
              startIcon={m.icon}
            >{m.title}</Button>
          </Link>)}
      </Box>
    </Box>
  );
};

const ChildSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { ctx, selectChild } = useApp();
  const router = useRouter();


  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectChild = (child: Models.Child) => {
    selectChild(child);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          src="/images/avatar-woman.png"
        />
        <Box flexGrow={1}>
          {ctx.child &&
            <span className="tw-text-xl tw-font-bold">{ctx.child.gender === "boy" ? `آقا ${ctx.child.name}` : `${ctx.child.name} خانوم`}</span>
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
            onClick={() => handleSelectChild(c)}
          >{c.name}</MenuItem>
        ))}
        <MenuItem
          onClick={() => router.push("/add-child")}
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

  useEffect(() => {
    if (range[0] !== null && range[1] !== null) {
      onRangeChange && onRangeChange(range);
    }
  }, [range]);

  return <BaseLayout>
    <Grid container spacing={0}>
      <Grid item sx={{ width: 300 }}>
        <NavBar />
      </Grid>
      <Grid item xs>
        {(Header || showChild === "header") && <Box className="tw-flex tw-justify-between tw-pt-5 tw-items-center">
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
          {showChild && <ChildSelector />}
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

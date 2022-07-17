import { useState, useEffect } from "react";
import BaseLayout from "layouts/baseLayout";
import { Box, Typography, Grid, Button, Stack, Avatar, Badge, InputAdornment, TextField } from "@mui/material";
import PlayIcon from "layouts/icons/play";
import VideoIcon from "layouts/icons/video";
import MusicIcon from "layouts/icons/music";
import ActivityIcon from "layouts/icons/activity";
import GameIcon from "layouts/icons/game";
import BookIcon from "../../layouts/icons/book";
import LoginIcon from "layouts/icons/login";
import { useApp } from "@kidneed/hooks";
import Link from "next/link";
import { Guard, Models } from "@kidneed/types";
import jMoment from "moment-jalaali";
import { useDashboard } from "../../core-team/api/dashboard";
import { useContents } from "../../core-team/api/activity";
import _ from "lodash";
import { useRouter } from "next/router";
import { POSTER_ORIGIN } from "../../core-team/constants";
import { Input, notification, Progress } from "antd";
import { useVerifyPassword } from "../../core-team/api/user";
import moment from "moment";

notification.config({
  placement: "bottomLeft"
});

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const styles = {
  root: {

    minHeight: 2000,
    overflow: "auto",
    "&:before": {
      content: "\" \"",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: 500,
      background: "linear-gradient(180deg, #E2F0FD 57.29%, rgba(226, 241, 254, 0) 100%)"
    }
  },
  dataMenu: {
    borderRadius: 50,
    width: 92,
    height: 92,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    "& svg": {
      fontSize: "44px"
    },
    img: {
      width: 70
    }
  },
  cardImage: {
    width: 287,
    height: 380,
    backgroundSize: "cover",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    border: "none",
    backgroundRepeat: "no-repeat",
    cursor: "pointer"
  }
};

const typeColors = {
  "video": "#57ABF4",
  "audio": "#EF5DA8",
  "activity": "#8BDA92",
  "game": "#FF5C00",
  "book": "#A084E1"
};

const typeNames: any = {
  video: "ویدئو",
  activity: "فعالیت",
  book: "کتاب",
  game: "بازی",
  audio: "صوت"
};

const typeIcons: any = {
  "video": VideoIcon,
  "audio": MusicIcon,
  "activity": ActivityIcon,
  "game": GameIcon,
  "book": BookIcon
};

const ItemPic = ({ content }: any) => {
  const type = content?.attributes?.type;
  const Icon = typeIcons[type];

  const getPoster = (content: any) => {
    return content?.attributes?.poster?.data?.attributes?.url;
  };

  if (getPoster(content)) {
    return <Box
      sx={{
        ...styles.cardImage,
        backgroundImage: `url("${getPoster(content)}")`,
        backgroundSize: "cover"
      }}
    />;
  }

  return (
    <Box sx={styles.cardImage} className="tw-items-center tw-flex tw-justify-center">
      {Icon && <Icon
        className={`tw-text-gray-400 !tw-w-28 !tw-h-28 ${type !== "game" && "!tw-fill-transparent"}`}
        style={{ stroke: "#8CA3A5" }}
      />}
    </Box>
  );
};

const DataBox = ({ data }: any) => {
  const router = useRouter();
  const { data: contents } = useContents(_.map(data, i => i.attributes?.content));

  if (!data[0]) return null;

  const duration = data[0].attributes?.duration;
  const progress = _.sumBy(data, (i: any) => i.attributes?.progress);

  const content1 = {
    activity: {
      id: data[0].id,
      ...data[0].attributes
    },
    ...(contents?.data?.find((c: any) => c.id === parseInt(data[0].attributes?.content)) || {})
  };
  const source1 = content1?.attributes?.meta?.source && content1?.attributes?.meta?.source[0].src;

  const content2 = {
    activity: {
      id: data[1].id,
      ...data[1].attributes
    },
    ...(contents?.data?.find((c: any) => c.id === parseInt(data[1].attributes?.content)) || {})
  };
  const source2 = content2?.attributes?.meta?.source && content2?.attributes?.meta?.source[0].src;

  // @ts-ignore
  const color = typeColors[content1.activity.type];
  // @ts-ignore
  const Icon = typeIcons[content1.activity.type];
  const type = content1?.attributes?.type;

  const openPlayer = (content: any, content2: any) => {
    const playerType = content?.attributes?.type;
    let source = content?.attributes?.meta?.source && content?.attributes?.meta?.source[0].src;
    source = source ? source : content?.attributes?.srcFile;

    if (playerType === "video")
      window.open(`${location.origin}/players/video?child=true&contentId=${content?.id}&id=${content?.activity?.id}&secondId=${content2?.activity?.id}&url=${encodeURIComponent(content?.attributes.sourceUrl)}`, "_blank");
    else if (playerType === "video" && content?.attributes?.attachments?.data)
      window.open(`${location.origin}/players/video?child=true&contentId=${content?.id}&id=${content?.activity?.id}&secondId=${content2?.activity?.id}&url=${encodeURIComponent(content?.attributes?.attachments?.data[0].url)}`, "_blank");
    else if (playerType === "activity")
      window.open(`${location.origin}/players/activity?child=true&activity=${content?.activity?.id}&secondId=${content2?.activity?.id}&id=${content.id}`, "_blank");
    else if (playerType === "game")
      window.open(`${location.origin}/players/${playerType}?child=true&contentId=${content?.id}&id=${content?.activity?.id}&secondId=${content2?.activity?.id}&url=${encodeURIComponent(content?.attributes?.sourceUrl)}`, "_blank");
    else if (playerType === "book")
      window.open(`${location.origin}/players/${playerType}?child=true&id=${content?.activity?.id}&secondId=${content2?.activity?.id}&url=${encodeURIComponent(content?.attributes?.srcFile)}`, "_blank");
    else if (source)
      window.open(`${location.origin}/players/${playerType}?child=true&contentId=${content?.id}&id=${content?.activity?.id}&secondId=${content2?.activity?.id}&url=${encodeURIComponent(source)}`, "_blank");
  };

  return <Box
    sx={{
      border: `5px solid ${color}`,
      padding: "30px 95px 30px 80px",
      background: "#fff",
      borderRadius: 6,
      position: "relative",
      mt: 2
    }}
  >
    <Grid container spacing={5}>
      <Stack sx={{ position: "absolute", right: -50, top: "30%" }} spacing={1}>
        {/* @ts-ignore */}
        <Box className="tw-flex tw-flex-col" sx={{ ...styles.dataMenu, background: color }}>
          {Icon &&
            <Icon className={`tw-stroke-white !tw-w-10 !tw-h-10 ${type !== "game" && "!tw-fill-transparent"}`} />}
          <span className="tw-text-lg">{typeNames[type]}</span>
        </Box>
        {/* @ts-ignore */}
        <Box sx={{ ...styles.dataMenu, background: "#FED150" }} className="tw-relative">
          <Progress
            width={92}
            trailColor="transparent"
            type="circle"
            percent={progress / duration * 100}
            format={() => ""}
            strokeColor="#FF8345"
            className="tw-absolute"
          />
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 700, mt: 0.5 }}
          >{duration}′</Typography>
        </Box>
      </Stack>
      <Grid item xs={6}>
        <Link href={data.url0 || "#"}>
          <Box textAlign="center">
            <ItemPic content={content1} />
            <Button
              variant="contained" color="primary" sx={{ width: 220, height: 70, borderRadius: 6, marginTop: -5 }}
              size="large"
              onClick={() => {
                if(progress < duration){
                  openPlayer(content1, content2)
                }
              }}
            >
              {progress >= duration ? "زمان شما به پایان رسیده" : <PlayIcon />}
            </Button>
          </Box>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="center">
          <ItemPic content={content2} />
          <Button
            variant="contained" color="primary" sx={{ width: 220, height: 70, borderRadius: 6, marginTop: -5 }}
            size="large"
            onClick={() => {
              if(progress < duration){
                openPlayer(content2, content1)
              }
            }}
          >
              {progress >= duration ? "زمان شما به پایان رسیده" : <PlayIcon />}
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>;
};

const Dashboard = () => {
  const [showUserSelect, setShowUseSelect] = useState(false);
  const { ctx, selectChild } = useApp();
  const { data } = useDashboard(ctx?.child?.id);
  const values = ctx?.child?.gender && childType[ctx?.child?.gender];

  const result = _.groupBy(data?.data, (i: any) => i.attributes?.type);

  useEffect(() => {
    localStorage.setItem("isChild", "true");
  }, []);

  return <BaseLayout>
    <>
      <Box sx={styles.root}>
        <Box
          sx={{
            width: 120,
            top: 15,
            right: 40,
            maxWidth: 120,
            zIndex: 1,
            position: "absolute",
            textAlign: "center"
          }}
        >
          {values && <Avatar
            className="tw-cursor-pointer"
            classes={{
              img: "!tw-object-contain"
            }}
            src={values.avatar}
            onClick={() => setShowUseSelect(true)}
            sx={{ width: 126, height: 126, p: 2, background: values.color, mx: "auto" }}
          />}
          {ctx.child &&
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mt: 1 }}
            >
              {ctx.child.gender === "boy" ? `آقا ${ctx.child.name}` : `${ctx.child.name} خانم`}
            </Typography>}
        </Box>
        <UserSelect
          open={showUserSelect}
          onSelect={(child: Models.Child) => {
            selectChild(child);
            setShowUseSelect(false);
          }}
        />
        <Box
          component="img" src="/images/logo.png" alt="logo"
          sx={{ width: 120, top: 35, left: 40, maxWidth: 120, zIndex: 1, position: "absolute" }}
        />
        <Box sx={{ position: "absolute", top: 10, right: "35%" }}>
          <Box component="img" src="/images/childImages/sun.png" alt="logo" sx={{ width: 200 }} />
          <Box
            component="img" src="/images/childImages/cloud1.png" alt="logo"
            sx={{ width: 260, top: -90, right: -80, maxWidth: 260, position: "relative" }}
          />
        </Box>
        <Box
          component="img" src="/images/childImages/cloud2.png" alt="logo"
          sx={{ width: 214, top: 60, left: 200, maxWidth: 214, position: "absolute" }}
        />
        <Box
          component="img" src="/images/childImages/cloud1.png" alt="logo"
          sx={{ width: 266, top: 300, right: 10, maxWidth: 266, position: "absolute" }}
        />
        <Box
          component="img" src="/images/childImages/baloon.png" alt="logo"
          sx={{ width: 195, top: 150, left: 210, maxWidth: 195, position: "absolute" }}
        />

        <Box sx={{ position: "relative", zIndex: 12 }}>
          <Typography variant="h4" className="tw-text-center !tw-mt-[250px]" style={{ textShadow: "0 0 10px #57ABF4" }}>
            سرگرمی‌های امروز من
          </Typography>
          <Box sx={{ maxWidth: 800, m: "50px auto 0" }}>
            {_.map(result, (items, type) => {
              const dataItems = _.chunk(items, 2);

              return _.map(dataItems, item => (
                <DataBox data={item} />
              ));
            })}
          </Box>
        </Box>
      </Box>
      <Clock />

      <Box><Footer /></Box>
    </>
  </BaseLayout>;
};

const Footer = () => {
  const { ctx } = useApp();
  const [showLogin, setShowLogin] = useState(false);

  return <Box sx={{ p: 8, mt: 8, background: "linear-gradient(0deg, #E2F0FD 57.29%, rgba(226, 241, 254, 0) 100%);" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      <Box component="img" src="/images/logo.png" alt="logo" sx={{ width: 90, maxWidth: 80 }} />
      <Box sx={{ textAlign: "center" }}>
        <Badge badgeContent={ctx?.user?.unreadNotifications} color="secondary" sx={{}}>
          <Button
            onClick={() => setShowLogin(true)}
            size="large"
            startIcon={<LoginIcon />}
            sx={{
              background: "#fff",
              borderRadius: 4,
              width: 220,
              mb: 2
            }}
          >محیط اختصاصی پدر و مادر</Button></Badge>
        <Typography variant="h6">تمامی حقوق این سایت محفوظ است.</Typography>
      </Box>
      <Box component="img" src="/images/childImages/footer.png" alt="logo" sx={{ width: 150, maxWidth: 150 }} />
    </Stack>
    <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
  </Box>;
};

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const BoxHeight = 126;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Box
    sx={{
      position: "absolute",
      top: 360,
      right: 0,
      bottom: 0,
      width: 120,
      zIndex: 1,
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#57ABF4",
      textShadow: "0 0 10px #57ABF4"
    }}
  >
    <Typography variant="h5">امروز</Typography>
    <Typography variant="body1" sx={{ color: "#8CA3A5" }}>{jMoment().format("jDD jMMMM")}</Typography>
    <Box sx={{ position: "relative", mt: 4 }}>
      <Box sx={{ position: "absolute", right: 0, width: "100%", height: "100%", background: "#fff" }}>
        <Box sx={{ background: "#E2F1FD", height: "100%", width: "60%", float: "right" }}></Box>
      </Box>
      {Array.from({ length: 12 }).fill(0).map((_, index) => <Box
        key={index}
        sx={{ borderTop: "1px solid #8CA3A5", position: "relative", zIndex: 1, height: BoxHeight }}
      />)}
      <Box sx={{ position: "absolute", top: 0 }}>
        {Array.from({ length: 3 }).fill(0).map((_, i) => (<Box
          key={i}
          sx={{
            borderTop: "1px solid #8CA3A5",
            position: "relative",
            zIndex: 1,
            height: BoxHeight * 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h4">{8 + i * 4}</Typography>
          {i === 2 &&
            <Typography variant="h4">{20}</Typography>
          }
        </Box>))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: 0,
          width: "100%",
          height: `${100 - ((jMoment.duration(jMoment().format("HH:mm")).asHours() - 8) / 12) * 100}%`,
          bottom: 0,
          background: "#fff"
        }}
      >
        <Box sx={{ borderTop: "2px solid #57ABF4", position: "relative" }}>
          <Box sx={{ width: 16, height: 16, background: "#57ABF4", borderRadius: 8, float: "left", mt: "-9px" }}></Box>
        </Box>
        <Box sx={{ background: "#57ABF4", height: "100%", width: "60%", float: "right" }}></Box>
      </Box>
    </Box>
  </Box>;
};

const LoginDialog = ({ open, onClose }: any) => {
  const { ctx, logout } = useApp();
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [numbers] = useState([Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1]);
  const { mutateAsync: verifyPassword, isLoading } = useVerifyPassword();

  const onSubmit = () => {
    if (!ctx.user?.hasLockPassword) {
      if (inputValue === (numbers[0] * numbers[1]).toString()) {
        localStorage.removeItem("isChild");
        location.href = "/parent/dashboard";
      } else {
        alert("کد وارد شده اشتباه است.");
      }
      return;
    }

    verifyPassword({ lockPassword: passwordValue }).then((resp: any) => {
      if (resp?.data?.verified === true) {
        localStorage.removeItem("isChild");
        location.href = "/parent/dashboard";
      } else {
        notification.error({
          message: "کلمه عبور وارد شده اشتباه است."
        });
      }
    });
  };

  if (!open) return <></>;

  return <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      zIndex: 20,
      height: "100vh",
      top: 0,
      width: "100%",
      right: 0,
      background: "rgba(226, 241, 253, 0.9)"
    }}
  >
    <Box className="tw-flex tw-justify-center tw-flex-col tw-items-center">
      <Box component="img" src="/images/logo.png" alt="logo" sx={{ width: 260, maxWidth: 260 }} />
      <Typography variant="h6">برای ورود به بخش والدین، ابتدا لطفا پاسخ سوال زیر را وارد نمایید.</Typography>
      <Box
        sx={{
          background: "#fff",
          textAlign: "center",
          borderRadius: 8,
          boxShadow: "0px 14px 17px rgba(0, 0, 0, 0.08)",
          p: 7,
          pb: 4,
          pt: 4,
          mt: 3,
          width: "100%"
        }}
      >
        {!ctx.user?.hasLockPassword &&
          <div className="tw-pt-3">
            <Typography variant="h6">{numbers[0]} * {numbers[1]} چند می شود</Typography>
            <Input
              className="tw-mt-4 tw-py-3"
              size="large"
              value={inputValue}
              onPressEnter={onSubmit}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="پاسخ سوال را وارد کنید"
            />
          </div>}
        {ctx.user?.hasLockPassword &&
          <>
            <Typography variant="h6">رمز ورود خود را وارد کنید</Typography>
            <Input.Password
              size="large"
              className="tw-mt-4 tw-py-3"
              value={passwordValue}
              onPressEnter={onSubmit}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </>
        }
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", "& button": { flexGrow: 1, borderRadius: 5 }, mt: 4 }}
        >
          <Button disabled={isLoading} variant="contained" size="large" onClick={onSubmit}>
            ورود
          </Button>
          <Button
            variant="outlined" size="large" sx={{ borderColor: "#D9D9D9", color: "rgba(0, 0, 0, 0.65)" }}
            onClick={onClose}
          >لغو</Button>
        </Stack>
        <div className="tw-mt-4 tw-text-right">
          برای انتخاب رمز ورود دلخواه، به قسمت تنظیمات مراجعه نمایید.
        </div>
        <div className="tw-mt-4 tw-text-right">
          <span>رمز ورود خود را فراموش کردید؟</span>
          <Link href="/login">
            <Button
              onClick={() => {
                logout();
                localStorage.removeItem("isChild");
              }}
            >ورود با پیامک</Button>
          </Link>
        </div>
      </Box>
    </Box>
  </Box>;
};

const childType: any = {
  boy: {
    color: "#57ABF4",
    avatar: "/images/avatar-man.png"
  },
  girl: {
    color: "#EF5DA8",
    avatar: "/images/avatar-woman.png"
  }
};

const AvatarBox = ({ type, name, onSelect }: any) => {
  // @ts-ignore
  const values = childType[type];

  return <Box
    onClick={onSelect}
    sx={{
      p: 3,
      background: "#fff",
      textAlign: "center",
      borderRadius: 8,
      cursor: "pointer",
      "&:hover": { background: "#f6f6f6" }
    }}
  >
    <Avatar
      classes={{
        img: "!tw-object-contain"
      }}
      src={values.avatar}
      sx={{ width: 126, height: 126, mb: 4, p: 3, background: values.color, mx: "auto" }}
    />
    <Typography variant="h5">{name}</Typography>
  </Box>;
};

const UserSelect = ({ open, onSelect }: any) => {
  const { ctx } = useApp();

  if (!open) return <></>;

  return <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      zIndex: 20,
      height: "100vh",
      top: 0,
      width: "100%",
      right: 0,
      background: "rgba(226, 241, 253, 0.9)"
    }}
  >
    <Stack justifyContent="center" alignItems="center">
      <Box sx={{ width: 460, textAlign: "center" }}>
        <Box component="img" src="/images/logo.png" alt="logo" sx={{ width: 260, maxWidth: 260, mx: "auto", mb: 1 }} />
        <Typography variant="h6">لطفا کودک خود را انتخاب کنید.</Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Stack direction="row" spacing={4} sx={{ mt: 4, "& > *": { flexGrow: 1 } }}>
          {ctx.children && ctx.children.map(child => (
            <AvatarBox
              key={child.id}
              type={child.gender}
              name={child.gender === "boy" ? `آقا ${child.name}` : `${child.name} خانم`}
              onSelect={() => onSelect(child)}
            />
          ))
          }
        </Stack>
      </Box>
    </Stack>
  </Box>;
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Dashboard.guard = guard;

export default Dashboard;

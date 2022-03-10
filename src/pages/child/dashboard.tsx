import { useState, useEffect } from "react";
import { openGuard } from "@kidneed/utils";
import BaseLayout from "layouts/baseLayout";
import { Box, Typography, Grid, Button, Stack, Avatar } from "@mui/material";
import PlayIcon from "layouts/icons/play";
import VideoIcon from "layouts/icons/video";
import MusicIcon from "layouts/icons/music";
import ActivityIcon from "layouts/icons/activity";
import GameIcon from "layouts/icons/game";

const styles = {
  root: {
    background:
      "linear-gradient(180deg, #E2F0FD 57.29%, rgba(226, 241, 254, 0) 100%)",
    minHeight: "100vh",
    overflow: "auto",
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
      fontSize: "44px",
    },
    img: {
      width: 70,
    },
  },
};

const data = [
  {
    type: "video",
    time: "10:00",
    img0: "/images/childImages/d0.png",
    img1: "/images/childImages/d1.png",
  },
  {
    type: "music",
    time: "10:00",
    img0: "/images/childImages/d0.png",
    img1: "/images/childImages/d1.png",
  },
  {
    type: "activity",
    time: "10:00",
    img0: "/images/childImages/d0.png",
    img1: "/images/childImages/d1.png",
  },
  {
    type: "game",
    time: "10:00",
    img0: "/images/childImages/d0.png",
    img1: "/images/childImages/d1.png",
  },
];

const typeColors = {
  video: "#57ABF4",
  music: "#EF5DA8",
  activity: "#8BDA92",
  game: "#FF5C00",
  book: "#57ABF4",
};

const typeIcons = {
  video: <VideoIcon />,
  music: <MusicIcon />,
  activity: <ActivityIcon />,
  game: <GameIcon />,
  book: <VideoIcon />,
};

const DataBox = ({ data }: any) => {
  // @ts-ignore
  const color = typeColors[data.type];
  // @ts-ignore
  const icon = typeIcons[data.type];

  return (
    <Box
      sx={{
        border: `5px solid ${color}`,
        padding: "30px 95px 30px 80px",
        background: "#fff",
        borderRadius: 6,
        position: "relative",
        mt: 2,
      }}
    >
      <Grid container spacing={5}>
        <Stack
          sx={{ position: "absolute", right: -50, top: "20%" }}
          spacing={1}
        >
          {/* @ts-ignore */}
          <Box sx={{ ...styles.dataMenu, background: color }}>{icon}</Box>
          {/* @ts-ignore */}
          <Box sx={{ ...styles.dataMenu, background: "#FED150" }}>
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: 700, mt: 0.5 }}
            >
              {data.time}
            </Typography>
          </Box>
          {/* @ts-ignore */}
          <Box sx={{ ...styles.dataMenu, background: color }}>
            <img src="/images/childImages/coins.png" />
          </Box>
        </Stack>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Box component="img" src="/images/childImages/d0.png" />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 220, height: 70, borderRadius: 6, marginTop: -5 }}
              size="large"
            >
              <PlayIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Box component="img" src="/images/childImages/d1.png" />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 220, height: 70, borderRadius: 6, marginTop: -5 }}
              size="large"
            >
              <PlayIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <BaseLayout>
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
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{ width: 118, height: 118, p: 2, background: "#57ABF4" }}
              src="/images/avatar-woman.png"
            />
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
              حسنا خانوم
            </Typography>
          </Box>
          <Box
            component="img"
            src="/images/logo.png"
            alt="logo"
            sx={{
              width: 120,
              top: 35,
              left: 40,
              maxWidth: 120,
              zIndex: 1,
              position: "absolute",
            }}
          />
          <Box sx={{ position: "absolute", top: 10, right: "35%" }}>
            <Box
              component="img"
              src="/images/childImages/sun.png"
              alt="logo"
              sx={{ width: 200 }}
            />
            <Box
              component="img"
              src="/images/childImages/cloud1.png"
              alt="logo"
              sx={{
                width: 260,
                top: -90,
                right: -80,
                maxWidth: 260,
                position: "relative",
              }}
            />
          </Box>
          <Box
            component="img"
            src="/images/childImages/cloud2.png"
            alt="logo"
            sx={{
              width: 214,
              top: 60,
              left: 200,
              maxWidth: 214,
              position: "absolute",
            }}
          />
          <Box
            component="img"
            src="/images/childImages/cloud1.png"
            alt="logo"
            sx={{
              width: 266,
              top: 300,
              right: 10,
              maxWidth: 266,
              position: "absolute",
            }}
          />
          <Box
            component="img"
            src="/images/childImages/baloon.png"
            alt="logo"
            sx={{
              width: 195,
              top: 150,
              left: 210,
              maxWidth: 195,
              position: "absolute",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 12 }}>
            <Box sx={{ maxWidth: 800, m: "300px auto 0" }}>
              {data.map((d, index) => (
                <DataBox key={index} data={d} />
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <Footer />
        </Box>
      </>
    </BaseLayout>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        p: 8,
        background:
          "linear-gradient(0deg, #E2F0FD 57.29%, rgba(226, 241, 254, 0) 100%);",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box
          component="img"
          src="/images/logo.png"
          alt="logo"
          sx={{ width: 90, maxWidth: 80 }}
        />
        <Box>
          <Typography variant="h6">تمامی حقوق این سایت محفوظ است.</Typography>
        </Box>
        <Box
          component="img"
          src="/images/childImages/footer.png"
          alt="logo"
          sx={{ width: 150, maxWidth: 150 }}
        />
      </Stack>
    </Box>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        background: "#fff",
        zIndex: 1,
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "#57ABF4",
        textShadow: "0 0 10px #57ABF4",
      }}
    >
      {time.toLocaleTimeString()}
    </Box>
  );
};

Dashboard.guard = openGuard;

export default Dashboard;

import { useUser } from "@kidneed/hooks";
import { openGuard } from "@kidneed/utils";
import {
  Typography,
  Box,
  Stack,
  Grid,
  Rating,
  Avatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import Image from "next/image";
import ImageCard1 from "public/images/parentCard/img1.png";
import ImageCard2 from "public/images/parentCard/img2.png";
import ImageCard3 from "public/images/parentCard/img3.png";
import EditIcon from "layouts/icons/edit";
import PsImage1 from "public/images/temp/ps1.png";
import PsImage2 from "public/images/temp/ps2.png";
import PsImage3 from "public/images/temp/ps3.png";
import AddIcon from "layouts/icons/add";
import AvatarWoman from "public/images/avatar-woman.png";
import ArrowDown from "layouts/icons/arrow-down";

const styles = {
  card: {
    p: 4,
    marginTop: 1,
    borderRadius: 8,
    height: "100%",
    "& *": {
      color: "#fff",
    },
    position: "relative",
    pb: 8,
  },
  cardImage: {
    textAlign: "center",
    mb: 2,
  },
  cardBottom: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    right: 0,
    px: 3,
  },
};

const scheduleData = [
  {
    image: PsImage1,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
  {
    image: PsImage2,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
  {
    image: PsImage3,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
  {
    image: PsImage1,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
  {
    image: PsImage2,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
  {
    image: PsImage3,
    title: "تماشای فیلم",
    subtitle: "سریال",
  },
];

const Schedule = () => {
  return (
    <Paper sx={{ mt: 4, p: 3, boxShadow: "none", borderRadius: 8 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h4">برنامه امروز</Typography>
          <Typography variant="h5" sx={{ color: "#8CA3A5", mt: 2 }}>
            شامل مجموعا 2 ساعت برنامه ریزی
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EditIcon />}
            sx={{
              color: "#8CA3A5",
              borderColor: "#8CA3A5!important",
              borderRadius: 3,
              height: 55,
            }}
          >
            ویرایش
          </Button>
        </Box>
      </Stack>
      <Grid container sx={{ mt: 3 }}>
        {scheduleData.map((item, index) => (
          <Grid key={index} item xs={6} sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="flex-start" spacing={3}>
              <Box sx={{ width: 150 }}>
                <Image src={item.image} />
              </Box>
              <Box>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h6" sx={{ color: "#8CA3A5", mt: 1 }}>
                  {" "}
                  {item.subtitle}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          fullWidth
          size="large"
          sx={{
            borderRadius: 8,
            height: 56,
            mt: 2,
            color: "#8CA3A5",
            borderColor: "#8CA3A5",
            maxWidth: "60%",
            margin: "16px auto 0",
          }}
        >
          افزودن برنامه ای جدید
        </Button>
      </Box>
    </Paper>
  );
};

const SideDashboard = () => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ py: 2, pr: 3, cursor: "pointer" }}
      >
        <Avatar
          sx={{ width: 90, height: 90, p: 2, background: "#E2F1FD" }}
          src="/images/avatar-woman.png"
        />
        <Box flexGrow={1}>
          <Typography variant="h5">حسنا خانوم</Typography>
          <Typography variant="h6" sx={{ color: "#8CA3A5" }}>
            2500 سکه
          </Typography>
        </Box>
        <Box>
          <ArrowDown sx={{ color: "#8CA3A5" }} />
        </Box>
      </Stack>
      <Box>
        <Box component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
      </Box>
    </>
  );
};

export default function Dashboard() {
  const user = useUser(1);
  return (
    <ParentDashboardLayout SideComponent={<SideDashboard />}>
      <Typography sx={{ mb: 2 }} variant="h4">
        سلام آقا محمد! 👋
      </Typography>
      <Grid
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridRowGap: 8,
          gridColumnGap: 8,
        }}
        container
        spacing={5}
      >
        <Grid item>
          {/* @ts-ignore */}
          <Box sx={{ ...styles.card, background: "#8BDA92" }}>
            <Box sx={styles.cardImage}>
              <Image src={ImageCard1} />
            </Box>

            <Box sx={styles.cardBottom}>
              <Typography variant="h3">21 ساعت</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">مطالعه</Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
          <Box sx={{ ...styles.card, background: "#FED150" }}>
            <Box sx={styles.cardImage}>
              <Image src={ImageCard2} />
            </Box>
            <Box sx={styles.cardBottom}>
              <Typography variant="h3">21 ساعت</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">مطالعه</Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
          <Box sx={{ ...styles.card, background: "#57ABF4" }}>
            <Box sx={styles.cardImage}>
              <Image src={ImageCard3} />
            </Box>
            <Box sx={styles.cardBottom}>
              <Typography variant="h3">21 ساعت</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">مطالعه</Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Schedule />
    </ParentDashboardLayout>
  );
}

Dashboard.guard = openGuard;

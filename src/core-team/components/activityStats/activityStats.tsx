import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ImageCard1 from "public/images/parentCard/img1.png";
import ImageCard2 from "public/images/parentCard/img2.png";
import ImageCard3 from "public/images/parentCard/img3.png";
import React from "react";
import moment from "moment";

const styles = {
  card: {
    p: 4,
    marginTop: 1,
    borderRadius: 8,
    height: "100%",
    "& *": {
      color: "#fff"
    },
    position: "relative",
    pb: 8
  },
  cardImage: {
    textAlign: "center",
    mb: 2
  },
  cardBottom: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    right: 0,
    px: 3
  }
};

export const ActivityStats = ({ stats, loading }: any) => {

  const getProgress = (minutes: number) => {
    const progress = moment.duration(minutes, 'minute');
    const hour = progress.hours();
    const minute = progress.minutes();

    if((hour === 0 && minute === 0) || (!hour && !minute)) {
      return '0 دقیقه'
    }

    if(hour === 0) {
      return `${minute} دقیقه`
    }

    return `${hour} ساعت و ${minute} دقیقه`
  }

  return (
    <Grid
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridRowGap: 16,
        gridColumnGap: 16
      }}
      container
    >
      <Grid item>
        {/* @ts-ignore */}
        <Box sx={{ ...styles.card, background: "#8BDA92" }}>
          <Box sx={styles.cardImage}>
            <Image src={ImageCard1} />
          </Box>

          <Box sx={styles.cardBottom}>
            <Typography variant="h5">{loading ? "-" : (getProgress(stats?.activity?.progress / 2) || 0)}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">فعالیت عملی</Typography>
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
            <Typography variant="h5">{loading ? "-" : (getProgress(stats?.game?.progress / 2) || 0)}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">بازی</Typography>
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
            <Typography variant="h5">{loading ? "-" : (getProgress(stats?.video?.progress / 2) || 0)}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">فیلم</Typography>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
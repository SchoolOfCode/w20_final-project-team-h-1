import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import heroImage from "../../assets/heroimage.jpg";
import dummy1 from "../../assets/undraw_fall_thyk.svg";
import dummy2 from "../../assets/undraw_my_app_re_gxtj.svg";
import dummy3 from "../../assets/undraw_step_to_the_sun_nxqq.svg";

const useStyles = makeStyles((theme) => ({
  mainLayout: {
    // flexDirection: "column",
    // backgroundColor: "green",
    padding: "16px",
  },
  h1Override: {
    fontSize: "1.875rem",
    fontWeight: "medium",
  },
  heroText: {
    [theme.breakpoints.up("sm")]: {
      padding: "24px 64px",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      padding: "96px 64px",
      alignItems: "center",
    },
  },
  "@global": {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    ".MuiTypography-h1": {
      [theme.breakpoints.up("xs")]: {
        fontSize: "2.375rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.9167rem",
      },
    },
  },
}));
const howItWorksSteps = [
  { step: 1, text: "Sign up", image: dummy1 },
  { step: 2, text: "Fill out form", image: dummy2 },
  { step: 3, text: "Match with mentor!", image: dummy3 },
];
function HomePage() {
  const classes = useStyles();
  console.log(howItWorksSteps[0].image2);
  return (
    <main style={{ padding: "16px" }}>
      <section>
        {/* container className={classes.mainLayout} spacing={2} */}
        <Box display="flex" flexWrap="wrap" align="left">
          <Grid container xs={12} sm={12} md={7} className={classes.heroText}>
            <Grid item container>
              <Typography
                variant="h1"
                className={classes.h1Override}
                gutterBottom
              >
                Kickstart your startup with a kickass mentor
              </Typography>
              <Typography variant="h6">
                Get an experienced mentor in your same field of business! Get an
                experienced mentor in your same field of business!
              </Typography>

              <Box
                component="div"
                display="flex"
                flexWrap="wrap"
                width="100%"
                gridGap={9}
                my={6}
              >
                <Box width={{ xs: "100%", sm: "40%", md: "35%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Sign up
                  </Button>
                </Box>
                <Box width={{ xs: "100%", sm: "40%", md: "35%" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    fullWidth
                  >
                    Log in
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={12} md={5}>
            <img
              src={heroImage}
              alt="hero"
              style={{ maxWidth: "100%", alignSelf: "center" }}
            />
          </Grid>
        </Box>
      </section>
      <Divider />
      <section>
        <Grid
          container
          xs={12}
          sm={12}
          //   md={6}
          justifyContent="center"
          style={{ margin: "0 auto", background: "blanchedalmond" }}
          className={classes.heroText}
          spacing={3}
        >
          <Grid item container xs={12} justifyContent="center">
            <Typography variant="h4">How it works</Typography>
          </Grid>
          <Grid container>
            {howItWorksSteps.map((item, index) => {
              return (
                <Grid
                  item
                  container
                  sm={12}
                  md={4}
                  justifyContent="center"
                  style={{ padding: "24px" }}
                >
                  <Typography variant="h5" gutterBottom>
                    Step {item.step}: {item.text}
                  </Typography>
                  <img
                    src={item.image}
                    style={{ maxWidth: "100%", alignSelf: "center" }}
                    alt={item.text}
                  />
                  ;
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </section>
      <Divider />
    </main>
  );
}

export default HomePage;
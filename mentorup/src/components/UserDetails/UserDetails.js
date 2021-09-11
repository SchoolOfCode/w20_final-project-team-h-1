import React, { useState, useEffect, useRef } from "react";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore, useUser } from "reactfire";
import { Link } from "react-router-dom";
import usernameGen from "username-gen";
import MentorMentee from "../Wizard/MentorMentee";
import CloseIcon from "@material-ui/icons/Close";
import UserName from "../Wizard/UsernameAvatar";
import Subject from "../Wizard/Subject";
import Industry from "../Wizard/Industry";
import clsx from "clsx";

import {
  Grid,
  Button,
  makeStyles,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import BusinessStage from "../Wizard/BusinessStage";
import BSL from "../Wizard/BSL";
import Language from "../Wizard/Language";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    // width: "30ch",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxHeight: 150,
    maxWidth: 150,
  },
  ciao: {
    marginBottom: theme.spacing(3),
  },
  hover: {
    "&:hover, &:focus": {
      background: "#3F51B5",
      color: "#000",
      "&:before": {
        background: "#5767BE",
        transform: "scale(1)",
      },
    },
  },
  mainLayout: {
    // flexDirection: "column",
    // backgroundColor: "green",
    padding: "16px",
  },
  h1Override: {
    fontSize: "1.875rem",
    fontWeight: "medium",
  },
}));

function UserDetails() {
  const { data: user } = useUser();

  const firestore = useFirestore();
  const userDataCollection = firestore.collection("userData");
  const classes = useStyles();

  const helpTopics = [
    "Accounting",
    "Business Plan",
    "Building a React website",
    "Capital & Investment",
    "HR & Recruitment",
    "Networking",
    "Marketing & Social Media",
    "Preparing a pitch",
  ];

  // states
  const [loading, setLoading] = useState(true);
  const [helpTopic, setHelpTopics] = useState(["Preparing a pitch"]);
  const [needsSignLanguageInterpreter, setNeedsSignLanguageInterpreter] =
    useState(true);
  const [language, setLanguage] = useState("English");
  const [industry, setIndustry] = useState("Agriculture");
  const [yearsInBusiness, setYearsInBusiness] = useState(0);
  const [menteeOrMentor, setMenteeOrMentor] = useState("Mentee");
  const [username, setUsername] = useState("");
  const [businessStage, setBusinessStage] = useState("Startup");
  const [existingFirebaseId, setExistingFirebaseId] = useState("");
  const [showUpdated, setShowUpdated] = useState(false);
  const [avatar, setAvatar] = useState(newAvatar());
  const [activeSteps, setActiveSteps] = useState(0);
  const [userName, setuserName] = useState(
    usernameGen.generateUsername(8, false)
  );

  function newAvatar() {
    const types = ["bottts", "gridy", "identicon"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const generateRandomString = () =>
      Math.random().toString(20).substring(2, 8);
    return `https://avatars.dicebear.com/api/${randomType}/${generateRandomString()}.svg`;
  }
  useEffect(() => {
    const getUserDetails = async () => {
      if (user === null || user === undefined) {
        return;
      }

      const userDetailsQuery = await userDataCollection
        .where("authenticationID", "==", user.uid)
        .get();

      setLoading(false);

      if (!userDetailsQuery.empty) {
        // grab the first entry
        let existingUserFirebaseData = userDetailsQuery.docs[0].data();

        // set the states to the existing data
        setExistingFirebaseId(userDetailsQuery.docs[0].id);
        setLanguage(existingUserFirebaseData.language);
        setIndustry(existingUserFirebaseData.industry);
        setBusinessStage(existingUserFirebaseData.businessStage);
        setHelpTopics(existingUserFirebaseData.helpTopic);
        setMenteeOrMentor(existingUserFirebaseData.type);
        setUsername(existingUserFirebaseData.username);
        setYearsInBusiness(existingUserFirebaseData.yearsInBusiness);
        setNeedsSignLanguageInterpreter(
          existingUserFirebaseData.needsSignLanguageInterpreter
        );
      }
    };
    getUserDetails();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      businessStage: businessStage,
      helpTopic: helpTopic,
      industry: industry,
      type: menteeOrMentor,
      username: username,
      yearsInBusiness: yearsInBusiness,
      language: language,
      needsSignLanguageInterpreter: needsSignLanguageInterpreter,
    };

    if (existingFirebaseId) {
      // update the existing record
      await userDataCollection.doc(existingFirebaseId).update(data);
    } else {
      // add a new record
      data.authenticationID = user.uid;
      await userDataCollection.add(data);
    }

    setShowUpdated(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowUpdated(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return (
      <p>
        You must be logged in to use this functionality, please login
        <Link to="/landing"> here</Link>
      </p>
    );
  }

  const getSteps = () => {
    return [
      "UsernameAvatar",
      "MentorMentee",
      "Subject",
      "BusinessStage",
      "Industry",
      "BSL",
      "Language",
    ];
  };
  const steps = getSteps();
  const handleNext = () => {
    setActiveSteps((nextStep) => nextStep + 1);
  };
  //Navigates to the previous page
  const handleBack = () => {
    setActiveSteps((previousStep) => previousStep - 1);
  };

  return (
    <div style={{ padding: "16px" }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          className={classes.mainLayout}
          spacing={2}
          style={{
            margin: "0 auto",
          }}
          xs={12}
          sm={12}
          md={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item container direction="column" spacing={4}>
            {activeSteps === 0 && (
              <UserName
                classes={classes}
                userName={userName}
                setuserName={setuserName}
                avatar={avatar}
                setAvatar={setAvatar}
                newAvatar={newAvatar}
              />
            )}
            {activeSteps === 1 && (
              <MentorMentee
                menteeOrMentor={menteeOrMentor}
                setMenteeOrMentor={setMenteeOrMentor}
                classes={classes}
              />
            )}
            {activeSteps === 2 && (
              <Subject
                helpTopics={helpTopics}
                setHelpTopics={setHelpTopics}
                classes={classes}
                helpTopic={helpTopic}
              />
            )}
            {activeSteps === 3 && (
              <Industry
                industry={industry}
                setIndustry={setIndustry}
                classes={classes}
              />
            )}
            {activeSteps === 4 && (
              <BusinessStage
                businessStage={businessStage}
                setBusinessStage={setBusinessStage}
                yearsInBusiness={yearsInBusiness}
                setYearsInBusiness={setYearsInBusiness}
                classes={classes}
              />
            )}
            {activeSteps === 5 && (
              <BSL
                needsSignLanguageInterpreter={needsSignLanguageInterpreter}
                setNeedsSignLanguageInterpreter={
                  setNeedsSignLanguageInterpreter
                }
              />
            )}
            {activeSteps === 6 && (
              <Language
                setLanguage={setLanguage}
                language={language}
                classes={classes}
              />
            )}
            <Button disabled={activeSteps === 0} onClick={handleBack}>
              Back
            </Button>
            <div>
              {activeSteps === steps.length ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonResponsive}
                  type="submit"
                >
                  Save User Details
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
            {/* <Button  onClick={handleNext}>
              Next
            </Button> */}
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.buttonResponsive}
              type="submit"
            >
              Save User Details
            </Button> */}
          </Grid>
        </Grid>
      </form>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={showUpdated}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Your Details Have Been Saved"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </div>
  );
}

export default UserDetails;

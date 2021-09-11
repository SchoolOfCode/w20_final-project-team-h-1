import { Card, CardMedia, Typography, makeStyles, Button } from "@material-ui/core";
import React, { useState } from "react";
import cx from "clsx";
import mentorProfiles from "../../assets/mentor";
import { Link } from "react-router-dom";
import "firebase/firestore";
import firebase from "firebase";
import { useFirestore, useUser, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
    padding: 6,
    marginTop: 20,
  },
  media: {
    maxWidth: "90%",
    // border: "1px solid black",
    // margin: "6",
  },
});

export function findMentor(listOfMentors, helpNeeded) {
  if (listOfMentors.length > 1) {
    const sameIndustry = listOfMentors.filter((mentor) => mentor.industry === helpNeeded.industry);
    if (sameIndustry.length !== 0) {
      listOfMentors = [...sameIndustry];
    }
  }
  let matchedMentor = listOfMentors[Math.floor(Math.random() * listOfMentors.length)];
  return matchedMentor;
}
const MatchWithMentor = () => {
  const [randomState, setRandomState] = useState();
  const { data: user } = useUser();
  //Gets info from local storage incase user is not defined yet
  const currentUserInfo = user ? user : JSON.parse(localStorage.getItem("currentUserInfo"));
  const firestore = useFirestore();
  const userRef = firestore
    .collection("userData")
    .where("authenticationID", "==", currentUserInfo.uid);
  const { data: currentUserObject } = useFirestoreCollectionData(userRef);
  //the user is in an Array, this removes it if it's there
  const currentUser = currentUserObject ? currentUserObject[0] : null;
  //help is needed later on, this stops it breaking
  const help = currentUser
    ? {
        requirements: currentUser.helpTopic,
        industry: currentUser.industry,
      }
    : {
        requirements: ["No Topic"],
        industry: ["No Topic"],
      };
  const mentorRef = firestore
    .collection("userData")
    .where("type", "==", "mentor")
    .where("helpTopic", "array-contains-any", help.requirements);
  //Returns array of mentors where the help topics match those of the user
  const { data: mentors } = useFirestoreCollectionData(mentorRef);
  //Finds mentors with the same industry then returns one which matches
  const myMentor = mentors ? findMentor(mentors, help) : [];
  const classes = useStyles();
  return myMentor ? (
    <div>
      <Typography variant="h4"> Your mentor is </Typography>
      <Card variant="outlined" className={classes.root}>
        <Typography className={cx(classes.root, classes.media)} variant="h5">
          {myMentor.username}
        </Typography>
        <CardMedia
          className={cx(classes.media, classes.root)}
          component="img"
          image={myMentor.avatar}
          title="Random Photo"
        ></CardMedia>
        <Link to={`/contact/${myMentor["NO_ID_FIELD"]}`}>
          <Button
            className={cx(classes.media, classes.root)}
            style={{ width: "90%" }}
            m={2}
            variant="contained"
            color="primary"
          >
            Contact Mentor
          </Button>
        </Link>
        <Button
          className={cx(classes.media, classes.root)}
          style={{ width: "90%" }}
          m={2}
          variant="contained"
          color="primary"
          onClick={() => setRandomState(Math.random())}
        >
          Refresh Mentor
        </Button>
      </Card>
    </div>
  ) : (
    <h1>No Mentors...</h1>
  );
};

export default MatchWithMentor;

const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// EXAMPLE
// Listens for new messages added to /messages/:documentId/original
// and creates an uppercase version of the message
// to / messages /: documentId / uppercase
exports.makeUppercase = functions.firestore
  .document("/helpRequests/{documentId}")
  .onUpdate((snap, context) => {
    // get original message (text content) and
    // Find the email address associated with the mentor ID
    // (map through your collection until perfect match is found)
    // Once a match is found connect to sendgrid
    // and send message to email address

    // Grab the current value of what was written to Firestore.
    const helpRequest = snap.data().original;

    let mentor = db.doc("userData/" + helpRequest.authenticationID).get();

    const msg = {
      to: mentor.email,
      from: "test@example.com", // Use the email address or domain you verified above
      subject: "Help Request from a new mentee",
      text: helpRequest.message,
      html: helpRequest.message,
    };

    return sgMail.send(msg).then(() => {});

    // You must return a Promise when performing asynchronous tasks
    // inside a Functions such as writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    // return snap.ref.set({ uppercase }, { merge: true });
  });

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

app.use(cors()); // for usage at the twilio token service function

app.use(express.static(path.join(__dirname, "build"))); // built react app will be at 'build' folder when deploying

// communications
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // index.html will be available at 'build' foder
});

// communications - twilio token service
const twilioAccountSid = "AC901f46a7e72de021ffd6853300e9870a";
const twilioAuthToken = "3669aed13fbacae6ea71966f0ee126ba";
const twilioApiKey = "SK4b5abd147eff1e69002c65ed20600a75"; // key SID
const twilioApiSecret = "H5KeWNmyt4q1QOrlw7hhwbLJtRaSgq4f";

app.get("/api/token-service", (req, res) => {
  const AccessToken = require("twilio").jwt.AccessToken;

  const VideoGrant = AccessToken.VideoGrant;

  const videoGrant = new VideoGrant();

  const { identity } = req.query;

  // create an access token which we will sign with Twilio and we will return that to client
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );

  token.addGrant(videoGrant); // ???

  const accessToken = token.toJwt();

  res.send({
    accessToken: accessToken,
  });
});

app.get("/api/room-exists", (req, res) => {
  const { roomId } = req.query;

  const client = require("twilio")(twilioAccountSid, twilioAuthToken);

  client.video
    .rooms(roomId)
    .fetch()
    .then((room) => {
      if (room) {
        res.send({
          roomExists: true,
          room,
        });
      } else {
        res.send({
          roomExists: false,
        });
      }
    })
    .catch((err) => {
      res.send({
        roomExists: false,
        err,
      });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started");
  console.log(`Listening at port ${PORT}`);
});

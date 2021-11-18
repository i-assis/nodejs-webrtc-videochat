exports.handler = function (context, event, callback) {
  const twilioAccountSid = context.ACCOUNT_SID;
  const twilioApiKey = context.API_KEY;
  const twilioApiSecret = context.API_SECRET;
  const identity = event.identity; // comes from the request

  const AccessToken = Twilio.jwt.AccessToken;

  // token creation
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );

  const VideoGrant = AccessToken.VideoGrant;
  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  // response preparation
  const response = new Twilio.Response();

  const headers = {
    "Access-Control-Allow-Origin": "*", // change this to your client-side URL after deployment
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  response.setHeaders(headers);
  response.setBody({
    accessToken: token.toJwt(),
  });

  // sending token back to the user
  return callback(null, response);
};

// to deploy this (and other) functions to twillio, from terminal:
// >> twillio serverless:deploy
// https//twil.io/.........../
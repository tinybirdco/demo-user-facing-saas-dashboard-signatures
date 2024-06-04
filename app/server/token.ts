"use server";

import jwt from "jsonwebtoken";

const TINYBIRD_SIGNING_TOKEN = process.env.TINYBIRD_SIGNING_TOKEN ?? "";
const WORKSPACE_ID = process.env.TINYBIRD_WORKSPACE ?? ""; // Get this ID by running `tb workspace current`
const PIPE_ID = "ranking_of_top_organizations_creating_signatures"; // The name of the pipe you want to consume

// Server function that generates a JWT
// All the Tinybird related data won't be visible in the browser
export async function generateJWT() {
  const next10minutes = new Date();
  next10minutes.setTime(next10minutes.getTime() + 1000 * 60 * 10);

  const payload = {
    workspace_id: WORKSPACE_ID,
    name: "my_demo_jwt",
    exp: next10minutes.getTime() / 1000, // Token only valid for the next 10 minutes
    scopes: [
      {
        type: "PIPES:READ",
        resource: PIPE_ID,
      },
    ],
  };

  return jwt.sign(payload, TINYBIRD_SIGNING_TOKEN);
}

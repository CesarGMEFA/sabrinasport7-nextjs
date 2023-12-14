import axios from "axios";

export const WOO_URL = "https://sabrinasport7.com/wp-json/wc/v3";
export const CK = process.env.NEXTJS_APP_WOO_CK;
export const CS = process.env.NEXTJS_APP_WOO_CS;

const api = axios.create({
  baseURL: WOO_URL,
  params: {
    consumer_key: CK,
    consumer_secret: CS,
  },
});



/**
 * Logs in a user with the provided username and password.
 * @param {string} email - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 */
export async function loginUser(email, password) {
  const response = await axios.post(
    "https://sabrinasport7.com/?rest_route=/simple-jwt-login/v1/auth",
    {
      email,
      password,
    }
  );

  const userJWT = await response.data.data.jwt;
  const userSession = parseJwt(userJWT);

  console.log("userSession", userSession);
}

/**
 * Parses a JWT token and returns the payload.
 *
 * @param {string} token - The JWT token to parse.
 *
 * @returns {Object|null} The parsed payload of the JWT token, or null if no token is provided.
 */
function parseJwt(token) {
  if (!token) {
    return;
  }

  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  const jsonPayload = JSON.parse(payload);

  return jsonPayload;
}

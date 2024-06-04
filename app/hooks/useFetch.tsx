import { generateJWT } from "@/server/token";
import { useState } from "react";

export function useFetcher() {
  const [token, setToken] = useState("");

  // Generate a new JWT token and store the new token in the state
  const refreshToken = async () => {
    const newToken = await generateJWT();
    setToken(newToken);
    return newToken;
  };

  // Function to fetch data from Tinybird URL with a JWT token
  // If the token expires, a new one is generated in the server
  return async (url: string) => {
    let currentToken = token;
    if (!currentToken) {
      currentToken = await refreshToken();
    }
    const response = await fetch(url + "&token=" + currentToken);

    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 403) {
      const newToken = await refreshToken();
      return fetch(url + "&token=" + newToken).then((res) => res.json());
    }
  };
}

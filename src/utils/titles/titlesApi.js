import axios from "axios";
const parent_api = "http://localhost:8000/api/v1/title/";

export const createTitle = async (token, title) => {
  try {
    const cleanToken = token?.trim();

    console.log(cleanToken, "CREATED_TITLE api Token");
    if (!token) {
      console.log("Token is not there. You must login yourself.", token);
    }

    const response = await axios.post(
      `${parent_api}`,
      { title },
      {
        headers: {
          Authorization: cleanToken,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Error in Adding Titles: ", err);
    throw err;
  }
};

export const getTitles = async (token) => {
  try {
    const cleanToken = token?.trim();

    console.log(cleanToken, "Getting_TITLEapi Token");
    if (!token) {
      console.log("Token is not there. You must login yourself.", token);
    }
    const response = await axios.get(`${parent_api}`, {
      headers: {
        Authorization: cleanToken,
      },
    });
    const titles = response.data;
    console.log("ALL TITLES ARE:", response.data);
    return titles;
  } catch (err) {
    console.log("Error in getting Titles", err);
    throw err;
  }
};

export const deleteTitles = async ({ token, id }) => {
  try {
    const cleanToken = token?.trim();

    if (!token) {
      console.log("Token is not there. You must login yourself.", token);
    }

    const response = await axios.delete(`${parent_api}${id}`, {
      headers: {
        Authorization: cleanToken,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error in deleting Titles", err);
    throw err;
  }
};

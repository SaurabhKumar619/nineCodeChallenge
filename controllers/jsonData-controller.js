const HttpError = require("../models/httpError");

// @controller
// @desc    Get the json data
const getJsonData = (req, res, next) => {
  const jsonData = req.body;

  // check for empty request body
  if (Object.keys(jsonData).length === 0) {
    throw new HttpError("The request data is empty", 404);
  }
  let finalResponse = [];
  try {
    for (value in jsonData.payload) {
      if (
        jsonData.payload[value].drm &&
        jsonData.payload[value].episodeCount > 0
      ) {
        finalResponse.push({
          image: jsonData.payload[value].image.showImage,
          slug: jsonData.payload[value].slug,
          title: jsonData.payload[value].title,
        });
      }
    }
  } catch (error) {
    throw new HttpError(
      "Something went wrong, could not iterate json data",
      500
    );
  }
  res.json({ response: finalResponse });
};

exports.getJsonData = getJsonData;

const CustomError = require("./CustomError");

// pagination.js
function pagination(page, pageSize) {
  page = page || 1;
  pageSize = pageSize || 10;

  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);
  return { offset, limit };
}

function parseJson(json) {
  if (json) {
    try {
      json = JSON.parse(json);
    } catch (error) {
      throw new CustomError("Error while parsing Json", 500);
    }
  }
  return json;
}
function stringfyJson(json) {
  if (!json) return "";
  try {
    json = JSON.stringify(json);
  } catch (error) {
    throw new CustomError("Error while stringfying Json", 500);
  }
  return json;
}




module.exports = {
  pagination,
  parseJson,
  stringfyJson,
};

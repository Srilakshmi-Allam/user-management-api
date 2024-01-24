const CustomError = require("./CustomError");

// pagination.js
function pagination(page, pageSize) {
  page = page || 1;
  pageSize = pageSize || 10;

  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);
  return { offset, limit };
}




module.exports = {
  pagination,
  stringfyJson,
};

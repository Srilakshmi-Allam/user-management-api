// ErrorMessages.js
const errorMessages = {
  EOCUG: "Error on creating user group.",
  EOCU: "Error on creating USer",
  ECU: "Error creating user",
  EOCS: "Error on creating screen",
  EOCR: "Error on creating Role",
  EOCRAS: "Error on creating Role Access Screens",
  EOCM: "Error on creating module",
  EOCBR: "Error On creating Benefit Rule",
  ECBG: "Error creating Benefit Group",


  EFD: "Error fetching Details",

  EUD: "Error Updating Details",

  UNF: "User not found",
  SNF: "Screen not found",
  RNF: "Role not found",
  RASNF: "ROle Access Screen not found",
  MNF: "Module not found",
  EFUG: "Error fetching user group",
  EFU: "Error fetching User",
  EFR: "Error fetching Role",
  EFRBUG: "Error fetching Role by UserGroup",
  EFS: "Error fetching screens",
  EFM: "Error fetching modules",
  EFRAS: "Error fetching Role Access Screens",

  IUGID: "Invalid UserGroupId",
  TRID: "RoleID is already taken. Please choose a different RoleID",
  IRID: "Invalid RoleID",
  ISID: "Invalid ScreenID",
  NURID: "No Users found for the specified RoleID",
  NMGID: "No Modules found for the specified UserGroupID",
  NUUGID: "No Users found for the specified UserGroupID",
  NSMID: "No Screens found for the specified ModuleID",
  NRUGID: "No Roles found for the specified UserGroupID",
  NRU: "User does not have a role",

  AISS: "Audit information stored successfully",

  ISE: "Internal Server Error",
  CF: "Connection Failed",
  PE: "Port error",

  NAT: "No authorization token key found",
  IT: "Invalid token or expired token",

};

module.exports = errorMessages;

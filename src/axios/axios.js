import axios from "axios";

import { apiRoutes } from "./../utils/routes";

export const getListData = () => {
  return axios.get(apiRoutes.list);
};

export const addUserData = ({
  firstName,
  lastName,
  email,
  stateName,
  cityName,
  pinCode,
}) => {
  return axios.get(apiRoutes.add, {
    params: {
      param1: email,
      param2: firstName,
      param3: lastName,
      param4: pinCode,
      param5: cityName,
      param6: stateName,
    },
  });
};

export const editUserData = ({
  firstName,
  lastName,
  email,
  stateName,
  cityName,
  pinCode,
}) => {
  return axios.get(apiRoutes.edit, {
    params: {
      param1: email,
      param2: firstName,
      param3: lastName,
      param4: pinCode,
      param5: cityName,
      param6: stateName,
    },
  });
};

export const deleteUserData = ({ email }) => {
  return axios.get(apiRoutes.delete, {
    params: {
      param1: email,
    },
  });
};

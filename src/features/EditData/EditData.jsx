import React, { useState } from "react";

import { routes } from "../../utils/routes";
import { editUserData } from "../../axios/axios";

function EditData(props) {
  const search = props.location.search;
  const data = new URLSearchParams(search);
  let email_id = data.get("param1");
  let first_name = data.get("param2");
  let last_name = data.get("param3");
  let pincode = data.get("param4");
  let city = data.get("param5");
  let states = data.get("param6");

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [stateName, setStateName] = useState(states);
  const [cityName, setCityName] = useState(city);
  const [pinCode, setPinCode] = useState(pincode);
  const [firstNameError, setFirstNameError] = useState({});
  const [lastNameError, setLastNameError] = useState({});
  const [stateNameError, setStateNameError] = useState({});
  const [cityNameError, setCityNameError] = useState({});
  const [pinCodeError, setPinCodeError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData();
    console.log(errors);
    if (errors === true) {
      editUserData({
        firstName: firstName,
        lastName: lastName,
        email: email_id,
        stateName: stateName,
        cityName: cityName,
        pinCode: pinCode,
      })
        .then((res) => {
          handleSuccess(res);
        })
        .catch((error) => {
          console.log(error);
          // handleFailure(error.response.data.error);
        });
    }
  };

  const handleSuccess = (data) => {
    alert("Data Updated");
    window.location.href = routes.list;
  };

  const validateFormData = () => {
    const firstNameError = {};
    const lastNameError = {};
    const emailError = {};
    const stateNameError = {};
    const cityNameError = {};
    const pinCodeError = {};

    let isValid = true;
    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const numCheck = /^[0-9\b]+$/;

    if (firstName.trim().length === 0) {
      firstNameError.fNameErr = "This field can not be empty";
      isValid = false;
    }
    if (lastName.trim().length === 0) {
      lastNameError.lNameErr = "This field can not be empty";
      isValid = false;
    }
    if (stateName.trim().length === 0) {
      stateNameError.sNameErr = "This field can not be empty";
      isValid = false;
    }
    if (cityName.trim().length === 0) {
      cityNameError.cNameErr = "This field can not be empty";
      isValid = false;
    }
    if (pinCode.trim().length === 0) {
      pinCodeError.pinErr = "This field can not be empty";
      isValid = false;
    }
    if (!numCheck.test(pinCode)) {
      pinCodeError.pinErr = "Only digits allowed";
      isValid = false;
    }
    if (pinCode.trim().length < 5 || pinCode.trim().length > 5) {
      pinCodeError.pinErr = "Pincode should be of 5 digits only";
      isValid = false;
    }

    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setStateNameError(stateNameError);
    setCityNameError(cityNameError);
    setPinCodeError(pinCodeError);
    return isValid;
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className=" overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="firstName"
                        className="block text-md font-medium text-blue-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="address-level2"
                        value={firstName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {Object.keys(firstNameError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {firstNameError[key]}
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="lastName"
                        className="block text-md font-medium text-blue-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="address-level2"
                        value={lastName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {Object.keys(lastNameError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {lastNameError[key]}
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-md font-medium text-blue-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="address-level2"
                        value={email_id}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:opacity-50"
                        readOnly
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-md font-medium text-blue-700"
                      >
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        autoComplete="state-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setStateName(e.target.value)}
                      >
                        <option></option>
                        <option>Maharashtra</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Delhi</option>
                      </select>
                      {Object.keys(stateNameError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {stateNameError[key]}
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-md font-medium text-blue-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        value={cityName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setCityName(e.target.value)}
                      />
                      {Object.keys(cityNameError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {cityNameError[key]}
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-md font-medium text-blue-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        value={pinCode}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                      {Object.keys(pinCodeError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {pinCodeError[key]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="px-4 inline-flex text-md leading-5 font-semibold rounded-full bg-blue-500 text-white"
                  >
                    Update
                  </button>

                  <button
                    type="submit"
                    className="px-4 ml-2 inline-flex text-md leading-5 font-semibold rounded-full bg-gray-400 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditData;

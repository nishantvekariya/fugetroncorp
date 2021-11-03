import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import { getListData, deleteUserData } from "../../axios/axios";

function ListData() {
  const [personData, setPersonData] = useState();
  const [deleteUser, setDeleteUser] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleSuccess = (res) => {
    const data = res.data.data;
    console.log(data);
    setPersonData(data);
  };

  useEffect(() => {
    getListData()
      .then((res) => {
        handleSuccess(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const deleteUserHandle = (personDetail) => {
    console.log(personDetail);
    setDeleteUser(personDetail);
    setIsVisible(true);
  };

  const deleteHandle = () => {
    deleteUserData({
      email: deleteUser.email,
    })
      .then((res) => {
        alert("Deleted Successfully");
        window.location.href = routes.list;
      })
      .catch((error) => {
        console.log(error);
        // handleFailure(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="p-2 md:w-40 ">
        <a
          className="flex items-center p-4 bg-transparent text-blue-700 border-b-2 border-blue-500 shadow-xs cursor-pointer"
          href={routes.add}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className=" text-sm font-medium ml-2 ">Add Record</p>
        </a>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      Pincode
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-white tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {personData &&
                    personData.map((person, key) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {key + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {person.first_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {person.last_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.states}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.pincode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Link
                            to={`${routes.edit}?param1=${person.email}&param2=${person.first_name}&param3=${person.last_name}&param4=${person.pincode}&param5=${person.city}&param6=${person.states}`}
                            target="_blank"
                          >
                            <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full uppercase bg-blue-500 text-white">
                              Edit
                            </span>
                          </Link>
                          <button onClick={(e) => deleteUserHandle(person)}>
                            <span className="px-2 ml-2 inline-flex text-sm leading-5 font-semibold rounded-full uppercase bg-red-500 text-white">
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h3 className="text-xl font-bold text-blue-600 py-4 ">
                  Are You Sure To Delete {deleteUser.first_name}{" "}
                  {deleteUser.last_name}?
                </h3>
              </div>
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={deleteHandle}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => setIsVisible(false)}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ListData;

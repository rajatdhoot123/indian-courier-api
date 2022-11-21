import Head from "next/head";
import { useState } from "react";
import { SUPPORTED_CARRIERS, API_STATUS } from "../constants";
import axios from "axios";

const TrackingTable = ({ data }) => {
  return (
    <table className="text-center w-full p-5 my-5">
      <thead className="bg-black flex text-white w-full">
        <tr className="flex w-full">
          <th className="w-1/3">Location</th>
          <th className="w-1/3">Details</th>
          <th className="w-1/3">Date</th>
        </tr>
      </thead>
      <tbody
        style={{ height: "50vh" }}
        className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full"
      >
        {data.map(({ location, detail, date }) => (
          <tr className="flex w-full p-2" key={detail + date}>
            <td className="w-1/3">{location}</td>
            <td className="w-1/3">{detail}</td>
            <td className="w-1/3">{date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Failed = ({ data }) => {
  return (
    <div className="my-5 p-2 border-gray-400 rounded-md border-2">
      <div>{data.message}</div>
    </div>
  );
};

export default function Home(props) {
  const [state, setState] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDEAL);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [[, carrier], [, trackingId]] = [...formData.entries()];
    try {
      setApiStatus(API_STATUS.FETCHING);
      const { data } = await axios.get(`/api/${carrier}/${trackingId}`, {
        headers: { token: props.config.accessToken },
      });
      setState(data);
      setApiStatus(API_STATUS.IDEAL);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      console.log(err?.response?.data);
    }
  };

  const SUPPORTED_CARRIERS_STRING = SUPPORTED_CARRIERS.map(
    ({ label }) => label
  ).join(", ");

  const handleChange = () => {
    if (state?.status === "failed") {
      setState(null);
    }
  };

  return (
    <div>
      <Head>
        <title>Courier Tracking | Track Shipment</title>
        <meta
          name="description"
          content={`Track delivery status of your packages. Supported tracking of multiple vendors ${SUPPORTED_CARRIERS_STRING}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-5xl font-bold">Track package now</h2>
            <h1 className="py-6">
              Track Package from {SUPPORTED_CARRIERS_STRING} and many more
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="input-group">
                  <select
                    name="carrier"
                    className="select select-bordered focus:outline-none w-1/3"
                  >
                    <option disabled selected={true}>
                      Pick Carrier
                    </option>
                    {SUPPORTED_CARRIERS.map(({ label }) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <input
                    onChange={handleChange}
                    required
                    name="trackingId"
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered focus:outline-none w-full"
                  />
                  <button
                    type="submit"
                    className={`btn btn-square ${
                      apiStatus === API_STATUS.FETCHING ? "loading" : ""
                    }`}
                  >
                    {apiStatus !== API_STATUS.FETCHING && (
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
            {state?.status === "failed" && <Failed data={state} />}
            {state?.status === "success" && <TrackingTable data={state.data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

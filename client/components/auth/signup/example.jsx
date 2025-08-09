"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Example = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = "68904265f60b1fabf015e70f";

    axios.get(`http://localhost:8080/api/user/${userId}`)
      .then((res) => {
    if (res.data && res.data.statuscode === 200 && res.data.data) {
          setData(res.data.data);
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        console.error("API error", err);
        setError("Something went wrong");
      });
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {!data && !error && <p>Loading user...</p>}

      {data && (
        <div key={data._id}>
          <p>Username: {data.userName}</p>
          <p>Full Name: {data.fullName}</p>
          <p>Phone: {data.phoneNumber}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  );
};

export default Example;

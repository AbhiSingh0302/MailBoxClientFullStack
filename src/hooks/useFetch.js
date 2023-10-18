import axios from "axios";
import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");

const useFetch = () => {
  const [data, setData] = useState(null);

  const emailId = useSelector((status) => status.user.email);

  const token = useSelector((status) => status.user.token);

  useEffect(() => {
      const intervalId = setInterval(() => {
        axios
          .get(`http://localhost:4000/getmail`, {
            params: {
              status: "inbox",
              email: emailId,
            },
            headers: { token },
          })
          .then((resp) => {
            setData(resp.data.data);
          });
      }, 2000);

      return () => {
        clearInterval(intervalId);
      }
  }, [emailId, token]);

  return data;
};

export default useFetch;

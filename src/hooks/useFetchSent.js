import axios from "axios";
import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");

const useFetchSent = () => {
  const [data, setData] = useState(null);

  const emailId = useSelector((status) => status.user.email);

  const token = useSelector((status) => status.user.token);

  useEffect(() => {
    axios.get(`http://localhost:4000/getmail`, {
        params: {
          status: "sent",
          email: emailId,
        },
        headers: { token },
      }).then(resp => {
        setData(resp.data.data);
      })
  }, [emailId, token]);

  return data;
};

export default useFetchSent;

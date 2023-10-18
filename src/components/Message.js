import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Message = () => {
    const {id} = useParams();
    const [email, setEmail] = useState(null);

    const token = useSelector(state => state.user.token);

    useEffect(() => {
        axios.get(`http://localhost:4000/message/${id}`,{headers:{token}})
        .then(resp => {
            setEmail(resp.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return <div>
        {email && 
        <>
        <h3>To: {email.to}</h3>
        <h3>From: {email.from}</h3>
        <h4>{email.text}</h4>
        </>}
    </div>
};

export default Message;

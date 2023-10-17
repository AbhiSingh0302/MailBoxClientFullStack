import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Message = () => {
    const {id} = useParams();
    const [email, setEmail] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:4000/message/${id}`)
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

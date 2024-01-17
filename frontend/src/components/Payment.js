import { React, useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import PaymentInfo from './PaymentInfo'
import PaymentSuccess from './PaymentSuccess'
import {useAuth} from "../context/AuthContext";

function Payment() {

    const [errorTxt, setErrorTxt] = useState("");
    const { email, token } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        /*fetch("/api/payment")
            .then((data) => data.json())
            .then((failed) => setFailed(failed))*/

        function makePaymentRequest(email) {
            console.log(email);
            fetch(`api/payment/${email}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },

            });

            navigate("/payment/success");
        }

        var d = Math.random()

        var number = document.getElementById("number").value;
        var name = document.getElementById("name").value;
        var code = document.getElementById("code").value;

        var onlyNumbers = true;
        var countNumbers = false;
        for (var i = 0; i < number.length; i++) {
            if (number.at(i) >= "0" && number.at(i) <= "9")
                countNumbers++
            else
                onlyNumbers = false
        }

        var codeNumbers = true;
        for (var i = 0; i < code.length; i++) {
            if (code.at(i) < "0" || code.at(i) > "9")
                codeNumbers = false
        }

        if (number.length === 0)
            setErrorTxt("Card number is required.")
        else if (!onlyNumbers)
            setErrorTxt("Only numbers are allowed in the Card number field.")
        else if (countNumbers !== 16)
            setErrorTxt("Card number must be 16 digits long.")
        else if (name.length === 0)
            setErrorTxt("Name is required.")
        else if (code.length === 0)
            setErrorTxt("Security code is required.")
        else if (code.length !== 3 || !codeNumbers)
            setErrorTxt("Security code must be a 3-digit number.")
        else {
            if (d < 0.7) {
                makePaymentRequest(email)
            } else {
                document.getElementById("code").value = "";
                alert("Payment failed. Please try again.");
                setErrorTxt("Payment failed. Please try again.");
            }
        }
    }

    return (
        <Routes>
            <Route path="/" element={<PaymentInfo handleSubmit={handleSubmit} errorTxt={errorTxt} />} />
            <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
    )
}

export default Payment
import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PaymentInfo from './PaymentInfo'
import PaymentSuccess from './PaymentSuccess'

function Payment() {

    const [failed, setFailed] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()

        /*fetch("/api/payment")
            .then((data) => data.json())
            .then((failed) => setFailed(failed))*/

        var d = Math.random()

        if (d < 0.5) {
            window.location.href = 'payment/success';
        } else {
            setFailed(true);
        }
    }

    return (
        <Routes>
            <Route path="/" element={<PaymentInfo handleSubmit={handleSubmit} failed={failed} />} />
            <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
    )
}

export default Payment
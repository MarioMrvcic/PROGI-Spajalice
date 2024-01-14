import { React, useState, useEffect } from 'react'
import './PaymentInfo.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function PaymentInfo(props) {

    const [date, setDate] = useState(new Date());

    return (
        <div className="payment">
            <h1>Payment</h1>
            <form action="" method="get" className="payment--form">
                <div className="payment--form">
                    <label>Card number </label>
                    <input type="text" name="number" id="number" required />
                </div>
                <div className="payment--form">
                    <label>Name on card </label>
                    <input type="text" name="name" id="name" required />
                </div>
                <div className="payment--form">
                    <label>Expiration date </label>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div className="payment--form">
                    <label>Security code (CVV/CVC) </label>
                    <input type="text" name="code" id="code" required />
                </div>
                <div>
                    <input type="submit" value="Complete payment" onClick={props.handleSubmit} />
                </div>
                {<p class="failed">{props.errorTxt}</p>}
            </form>
        </div>
    )
}

export default PaymentInfo
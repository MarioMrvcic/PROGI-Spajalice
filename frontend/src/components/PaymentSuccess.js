import { React } from 'react'
import './PaymentSuccess.css'
import { Link } from 'react-router-dom'

function PaymentInfo(props) {

    //const [passed, setPassed] = useState();

    return (
        <div className="success">
            <h1>Payment successfull!</h1>
            <p>Return to <Link to="/">homepage</Link></p>
        </div>
    )
}

export default PaymentInfo
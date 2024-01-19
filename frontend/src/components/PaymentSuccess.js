import { React } from 'react'
import './PaymentSuccess.css'
import { Link } from 'react-router-dom'

function PaymentInfo(props) {
    //const [passed, setPassed] = useState();

    return (
        <div className="success">
            <h1>Payment successfull!</h1>
            <div class="container">
                <Link to="/" className="home">
                    <button class="return">Return to homepage</button>
                </Link>
            </div>
        </div>
    )
}

export default PaymentInfo

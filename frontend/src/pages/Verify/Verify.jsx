import React, { useContext, useEffect, useState } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const verifyPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/order/verify`, {success, orderId});
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError("Payment verification failed");
            console.error("Verification error:", err);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [url, orderId, success, navigate]); // Added dependencies

    return (
        <div className="verify">
            {loading ? (
                <div className="spinner"></div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : null}
        </div>
    );
}

export default Verify;
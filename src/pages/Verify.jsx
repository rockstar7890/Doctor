// import axios from 'axios';
// import React, { useContext, useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { toast } from 'react-toastify';

// const Verify = () => {

//     const [searchParams, setSearchParams] = useSearchParams()

//     const success = searchParams.get("success")
//     const appointmentId = searchParams.get("appointmentId")

//     const { backendUrl, token } = useContext(AppContext)

//     const navigate = useNavigate()

//     // Function to verify stripe payment
//     const verifyStripe = async () => {

//         try {

//             const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

//             if (data.success) {
//                 toast.success(data.message)
//             } else {
//                 toast.error(data.message)
//             }

//             navigate("/my-appointments")

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     useEffect(() => {
//         if (token, appointmentId, success) {
//             verifyStripe()
//         }
//     }, [token])

//     return (
//         <div className='min-h-[60vh] flex items-center justify-center'>
//             <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
//         </div>
//     )
// }

// export default Verify

import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();

    const success = searchParams.get("success");
    const appointmentId = searchParams.get("appointmentId");
    const paymentId = searchParams.get("paymentId");   // PayPal
    const PayerID = searchParams.get("PayerID");       // PayPal

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to verify payment (Stripe or PayPal)
    const verifyPayment = async () => {
        try {
            let response;
            http://localhost:5173/verify?success=true&appointmentId=68109d0238ea977d8fe48aef&paymentId=PAYID-NAIJ4LI2EX04984FF997901R&token=EC-7R390751VU1404437&PayerID=CJ6RMUQWHBUEQ
            if (paymentId && PayerID) {
                // PayPal verification
                response = await axios.post(
                    `${backendUrl}/api/user/verifyPaypal`,
                    { appointmentId, paymentId, PayerID, success },
                    { headers: { token } }
                );
            }
             else {
                // Stripe verification
                response = await axios.post(
                    `${backendUrl}/api/user/verifyStripe`,
                    { appointmentId, success },
                    { headers: { token } }
                );
            }

            const data = response.data;

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            navigate("/my-appointments");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while verifying payment.");
        }
    };

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyPayment();
        }
    }, [token]);

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;

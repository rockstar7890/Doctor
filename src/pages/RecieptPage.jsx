import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReceiptPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.receipt) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-red-500">No receipt data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    receiptId,
    userName,
    userEmail,
    doctorName,
    specialization,
    appointmentDate,
    appointmentTime,
    amountPaid,
    paymentDate,
    paymentMethod,
  } = state.receipt;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded mt-8 shadow print:border-none print:shadow-none">
      {/* Top right print button */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Print
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Appointment Receipt</h2>
      <div className="space-y-2">
        <p><strong>Receipt ID:</strong> {receiptId}</p>
        <p><strong>User:</strong> {userName} ({userEmail})</p>
        <p><strong>Doctor:</strong> {doctorName} ({specialization})</p>
        <p><strong>Date:</strong> {new Date(appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointmentTime}</p>
        <p><strong>Amount Paid:</strong> ₹{amountPaid}</p>
        <p><strong>Payment Date:</strong> {new Date(paymentDate).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
      </div>

      <div className="mt-6 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-primary text-white rounded"
        >
          Back to Appointments
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;

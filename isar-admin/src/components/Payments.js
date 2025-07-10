import React, { useEffect, useState } from 'react';
import './Payments.css';
import { generateReceiptPDF } from '../utils/generateReceipt';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
     fetch(`${process.env.REACT_APP_API_URL}/api/admin/payments`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPayments(data.payments);
          setFiltered(data.payments);
        } else {
          alert('Failed to fetch payments.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching payments:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const result = payments.filter(pay =>
      pay.user_name.toLowerCase().includes(term) ||
      pay.email.toLowerCase().includes(term) ||
      pay.course_title.toLowerCase().includes(term) ||
      (pay.receipt_id && pay.receipt_id.toString().includes(term))
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, payments]);

  const exportToExcel = () => {
    const exportData = filtered.map(p => ({
      'Receipt ID': p.receipt_id,
      'User Name': p.user_name,
      'Email': p.email,
      'Course': p.course_title,
      'Amount': p.amount,
      'Status': p.status,
      'Date': new Date(p.payment_date).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'ISAR_Payments.xlsx');
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="payments-container">
      <h2>All Payments</h2>

      <div className="payments-toolbar">
        <input
          type="text"
          placeholder="Search by name, email, course or receipt ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="export-btn" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>

      {loading ? (
  <p>Loading payments...</p>
) : filtered.length === 0 ? (
  <p>No payment records found.</p>
) : (
  <>
    {/* Table View (Desktop) */}
    <table className="payments-table desktop-only">
      <thead>
        <tr>
          <th>#</th>
          <th>Receipt ID</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
          <th>Receipt</th>
        </tr>
      </thead>
      <tbody>
        {paginated.map((pay, index) => (
          <tr key={pay.id}>
            <td>{(currentPage - 1) * pageSize + index + 1}</td>
            <td>{pay.receipt_id || '—'}</td>
            <td>{pay.user_name}</td>
            <td>{pay.email}</td>
            <td>{pay.course_title}</td>
            <td>₹{pay.amount}</td>
            <td>
              <span className={`status ${pay.status}`}>{pay.status}</span>
            </td>
            <td>{new Date(pay.payment_date).toLocaleString()}</td>
            <td>
              <button
                className="receipt-btn"
                onClick={() => generateReceiptPDF(pay)}
                disabled={pay.status !== 'paid' || !pay.receipt_id}
                title={
                  pay.status !== 'paid'
                    ? 'Receipt available after payment'
                    : 'Download payment receipt'
                }
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Card View (Mobile) */}
    <div className="payments-cards mobile-only">
      {paginated.map((pay, index) => (
        <div className="payment-card" key={pay.id}>
          <p><strong>#{(currentPage - 1) * pageSize + index + 1}</strong></p>
          <p><strong>Receipt ID:</strong> {pay.receipt_id || '—'}</p>
          <p><strong>Name:</strong> {pay.user_name}</p>
          <p><strong>Email:</strong> {pay.email}</p>
          <p><strong>Course:</strong> {pay.course_title}</p>
          <p><strong>Amount:</strong> ₹{pay.amount}</p>
          <p><strong>Status:</strong> <span className={`status ${pay.status}`}>{pay.status}</span></p>
          <p><strong>Date:</strong> {new Date(pay.payment_date).toLocaleString()}</p>
          <button
            className="receipt-btn"
            onClick={() => generateReceiptPDF(pay)}
            disabled={pay.status !== 'paid' || !pay.receipt_id}
          >
            Download Receipt
          </button>
        </div>
      ))}
    </div>

    <div className="pagination">
      <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
        ◀ Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
        Next ▶
      </button>
    </div>
  </>
)}

    </div>
  );
};

export default Payments;

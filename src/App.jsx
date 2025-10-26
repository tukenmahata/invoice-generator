import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
/* Bootstrap CSS via CDN is included in public/index.html, not imported in JS files */
import "./invoice.css"; // custom styling for print & UI

export default function App() {
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("Your Company Name");
  const [clientName, setClientName] = useState("Client Name");
  const [invoiceNo, setInvoiceNo] = useState("2515");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, price: 0 }]);

  const addItem = () => setItems([...items, { description: "", qty: 1, price: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, index) => index !== i));
  const updateItem = (i, field, val) => {
    const newItems = [...items];
    newItems[i][field] = field === "qty" || field === "price" ? Number(val) : val;
    setItems(newItems);
  };

  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const tax = subtotal * 0.0; // change tax if needed
  const total = subtotal + tax;

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="container my-4 invoice-container">
      {/* Header */}
      <div className="row align-items-center border-bottom pb-3 mb-4">
        <div className="col-md-6">
          {logo ? (
            <img src={logo} alt="Logo" className="img-fluid mb-2" style={{ maxHeight: "80px" }} />
          ) : (
            <div className="border p-3 text-muted">Upload Logo</div>
          )}
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="form-control mt-2" />
        </div>
        <div className="col-md-6 text-end">
          <h2 className="fw-bold">INVOICE #{invoiceNo}</h2>
          <p>Date: <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></p>
          <p>Due Date: <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></p>
        </div>
      </div>

      {/* Client Info */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Invoice To:</h5>
          <input
            type="text"
            className="form-control"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <h5>From:</h5>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      </div>

      {/* Items Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th style={{ width: "80px" }}>Qty</th>
            <th style={{ width: "120px" }}>Price (₹)</th>
            <th style={{ width: "120px" }}>Total (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={it.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.qty}
                  onChange={(e) => updateItem(i, "qty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={it.price}
                  onChange={(e) => updateItem(i, "price", e.target.value)}
                />
              </td>
              <td>{it.qty * it.price}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mb-4" onClick={addItem}>+ Add Item</button>

      {/* Totals */}
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td className="text-end">₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td className="text-end">₹{tax.toFixed(2)}</td>
              </tr>
              <tr className="fw-bold">
                <td>Total</td>
                <td className="text-end">₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Print & Download */}
      <div className="text-center mt-4 no-print">
        <button className="btn btn-success me-2" onClick={() => window.print()}>🖨 Print Invoice</button>
      </div>
    </div>
  );
}

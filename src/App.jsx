import React, { useState } from 'react';
import './invoice.css';

function App() {
  const [companyName, setCompanyName] = useState('Your Company');
  const [companyAddress, setCompanyAddress] = useState('123 Street, City, Country');
  const [companyPhone, setCompanyPhone] = useState('123-456-7890');
  const [logo, setLogo] = useState(null);

  const [clientName, setClientName] = useState('Client Name');
  const [clientAddress, setClientAddress] = useState('456 Avenue, City, Country');
  
  const [invoiceNumber, setInvoiceNumber] = useState('001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString());
  const [dueDate, setDueDate] = useState('');
  const [currency, setCurrency] = useState('₹');

  const [items, setItems] = useState([
    { description: 'Item 1', quantity: 1, unitPrice: 1000.00 },
    { description: 'Item 2', quantity: 2, unitPrice: 2000.00 },
  ]);

  const [notes, setNotes] = useState('Thanks for your business!');
  const [gstRate] = useState(18); // Fixed GST Rate

  const handleLogoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setLogo(URL.createObjectURL(img));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0.00 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const gst = subtotal * (gstRate / 100);
  const total = subtotal + gst;

  return (
    <div className="invoice-wrapper">
      <div className="invoice" id="invoice">
        <div className="invoice-header">
          <div className="invoice-logo">
            {logo ? <img src={logo} alt="Company Logo" /> : <h2>Your Logo</h2>}
            <input type="file" onChange={handleLogoUpload} className="no-print" />
          </div>
          <div className="invoice-company-details">
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Your Company" />
            <input type="text" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} placeholder="Company Address" />
            <input type="text" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} placeholder="Phone" />
          </div>
        </div>

        <div className="invoice-details">
          <div className="invoice-client-details">
            <h3>Bill To:</h3>
            <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Name" />
            <input type="text" value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="Client Address" />
          </div>
          <div className="invoice-meta-details">
            <p><strong>Invoice #:</strong> <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} /></p>
            <p><strong>Date:</strong> <input type="text" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} /></p>
            <p><strong>Due Date:</strong> <input type="text" value={dueDate} onChange={e => setDueDate(e.target.value)} /></p>
            <p><strong>Currency:</strong> <input type="text" value={currency} onChange={e => setCurrency(e.target.value)} /></p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price ({currency})</th>
              <th>Total ({currency})</th>
              <th className="no-print"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td><input type="text" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} placeholder="Item description" /></td>
                <td><input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.valueAsNumber)} /></td>
                <td><input type="number" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', e.target.valueAsNumber)} /></td>
                <td>{currency}{(item.quantity * item.unitPrice).toFixed(2)}</td>
                <td className="no-print"><button onClick={() => removeItem(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="btn btn-primary no-print">Add Item</button>

        <div className="invoice-summary">
          <p><strong>Subtotal:</strong> {currency}{subtotal.toFixed(2)}</p>
          <p><strong>GST ({gstRate}%):</strong> {currency}{gst.toFixed(2)}</p>
          <h3><strong>Total:</strong> {currency}{total.toFixed(2)}</h3>
        </div>

        <div className="invoice-notes">
          <h4>Notes</h4>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}></textarea>
        </div>

        <div className="invoice-footer">
          <p>Thank you for your business.</p>
        </div>
      </div>
      <div className="no-print controls">
        <button onClick={() => window.print()} className="btn btn-success">Print Invoice</button>
      </div>
    </div>
  );
}

export default App;

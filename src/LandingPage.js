import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [senderPhone, setSenderPhone] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [lineItems, setLineItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [notes, setNotes] = useState('');

    const handleSenderNameChange = (event) => {
        const name = event.target.value;
        if (/^[A-Za-z\s]*$/.test(name)) {
            setSenderName(name);
        } else if (name === "") {
            setSenderName("");
        }
    };

    const handleSenderAddressChange = (event) => {
        const address = event.target.value;
        if (address.length > 0) {
            setSenderAddress(address);
        }
    };

    const handleSenderPhoneChange = (event) => {
        const phone = event.target.value;
        if (/^\d{0,10}$/.test(phone)) {
            setSenderPhone(phone);
        }
    };


    const handleSenderEmailChange = (event) => {
        setSenderEmail(event.target.value);
    };

    // const handleSenderEmailBlur = () => {
    //     const email = senderEmail.trim();
    //     if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //         setSenderEmail(email);
    //     } else {
    //         setSenderEmail('');
    //     }
    // };


    const handleRecipientNameChange = (event) => {
        const name = event.target.value;
        if (/^[A-Za-z\s]+$/.test(name)) {
            setRecipientName(name);
        }
    };

    const handleRecipientAddressChange = (event) => {
        const address = event.target.value;
        if (address.length > 0) {
            setRecipientAddress(address);
        }
    };

    const handleRecipientPhoneChange = (event) => {
        const phone = event.target.value;
        if (/^\d{0,10}$/.test(phone)) {
            setRecipientPhone(phone);
        }
    };

    const handleRecipientEmailChange = (event) => {
        setRecipientEmail(event.target.value);
    };

    const handleRecipientEmailBlur = () => {
        const email = senderEmail.trim();
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSenderEmail(email);
        } else {
            setSenderEmail('');
        }
    };

    const handleInvoiceNumberChange = (event) => {
        const number = event.target.value;
        if (number.length > 0) {
            setInvoiceNumber(number);
        }
    };

    const handleInvoiceDateChange = (event) => {
        const date = event.target.value;
        if (date.length > 0) {
            setInvoiceDate(date);
        }
    };

    const handleLineItemsChange = (event, index) => {
        const { name, value } = event.target;
        const updatedLineItems = [...lineItems];
        if (name === 'quantity' || name === 'unitPrice') {
            if (/^\d+(\.\d{1,2})?$/.test(value)) {
                updatedLineItems[index][name] = parseFloat(value);
                setLineItems(updatedLineItems);
            }
        } else if (name === 'description') {
            updatedLineItems[index][name] = value;
            setLineItems(updatedLineItems);
        }
    };

    const handleAddLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: 0, unitPrice: 0 }]);
    };

    const handleRemoveLineItem = (index) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems.splice(index, 1);
        setLineItems(updatedLineItems);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleCalculate = () => {
        let subtotal = 0;
        lineItems.forEach((item) => {
            const itemTotal = item.quantity * item.unitPrice;
            subtotal += itemTotal;
        });
        setSubtotal(subtotal);
        const tax = subtotal * 0.1;
        setTax(tax);
        const total = subtotal + tax;
        setTotal(total);
    };

    const handleGenerateInvoice = () => {
        const formData = new FormData();
        formData.append('senderName', senderName);
        formData.append('senderAddress', senderAddress);
        formData.append('senderPhone', senderPhone);
        formData.append('senderEmail', senderEmail);
        formData.append('recipientName', recipientName);
        formData.append('recipientAddress', recipientAddress);
        formData.append('recipientPhone', recipientPhone);
        formData.append('recipientEmail', recipientEmail);
        formData.append('invoiceNumber', invoiceNumber);
        formData.append('invoiceDate', invoiceDate);
        lineItems.forEach((item) => {
            formData.append('lineItems[]', item);
        });
        formData.append('subtotal', subtotal);
        formData.append('tax', tax);
        formData.append('total', total);
        formData.append('notes', notes);

        fetch('http://127.0.0.1:5000', {
            method: 'POST',
            body: formData
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'invoice.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                console.log('Invoice generated successfully');
                alert('Invoice generated successfully');
            })
            .catch(error => {
                console.error('Error generating invoice:', error);
                alert('Error generating invoice');
            });
    };



    return (
        <div className="landing-page">
            <div className="container">
                <h1>Create an Invoice</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="senderName">Sender Name:</label>
                        <input type="text" id="senderName" value={senderName} onChange={handleSenderNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senderAddress">Sender Address:</label>
                        <input type="text" id="senderAddress" value={senderAddress} onChange={handleSenderAddressChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senderPhone">Sender Phone:</label>
                        <input type="tel" id="senderPhone" value={senderPhone} onChange={handleSenderPhoneChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="senderEmail">Sender Email:</label>
                        <input type="email" id="senderEmail" value={senderEmail} onChange={handleSenderEmailChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipientName">Recipient Name:</label>
                        <input type="text" id="recipientName" value={recipientName} onChange={handleRecipientNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipientAddress">Recipient Address:</label>
                        <input type="text" id="recipientAddress" value={recipientAddress} onChange={handleRecipientAddressChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipientPhone">Recipient Phone:</label>
                        <input type="tel" id="recipientPhone" value={recipientPhone} onChange={handleRecipientPhoneChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipientEmail">Recipient Email:</label>
                        <input type="email" id="recipientEmail" value={recipientEmail} onChange={handleRecipientEmailChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="invoiceNumber">Invoice Number:</label>
                        <input type="text" id="invoiceNumber" value={invoiceNumber} onChange={handleInvoiceNumberChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="invoiceDate">Invoice Date:</label>
                        <input type="date" id="invoiceDate" value={invoiceDate} onChange={handleInvoiceDateChange} />
                    </div>
                    <div className="form-group">
                        <h2>Line Items:</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lineItems.map((item, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="description" value={item.description} onChange={(event) => handleLineItemsChange(event, index)} /></td>
                                        <td><input type="number" name="quantity" value={item.quantity} onChange={(event) => handleLineItemsChange(event, index)} /></td>
                                        <td><input type="number" name="unitPrice" value={item.unitPrice} onChange={(event) => handleLineItemsChange(event, index)} /></td>
                                        <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                                        <td><button type="button" onClick={() => handleRemoveLineItem(index)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={handleAddLineItem}>Add Line Item</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtotal">Subtotal:</label>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tax">Tax:</label>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Total:</label>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes:</label>
                        <textarea id="notes" value={notes} onChange={handleNotesChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={handleCalculate}>Calculate</button>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={handleGenerateInvoice}>Generate Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LandingPage;
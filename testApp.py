import requests

url = 'http://127.0.0.1:5000/'

data = {
    'senderName': 'John Doe',
    'senderAddress': '123 Main St',
    'senderPhone': '555-555-1212',
    'senderEmail': 'johndoe@example.com',
    'recipientName': 'Jane Smith',
    'recipientAddress': '456 Elm St',
    'recipientPhone': '555-555-2323',
    'recipientEmail': 'janesmith@example.com',
    'invoiceNumber': '12345',
    'invoiceDate': '2022-03-26',
    'lineItems[]': ['Item 1,1,10.00', 'Item 2,2,20.00', 'Item 3,3,30.00'],
    'subtotal': '120.00',
    'tax': '10.00',
    'total': '130.00',
    'notes': 'Thank you for your business!\nPlease make payment within 30 days.'
}

response = requests.post(url, data=data)
if response.status_code == 200:
    with open(f'{data["invoiceNumber"]}.pdf', 'wb') as f:
        f.write(response.content)
    print(f'Invoice saved as {data["invoiceNumber"]}.pdf')
else:
    print('Error:', response.status_code, response.json())

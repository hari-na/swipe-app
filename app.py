from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app, catch_all_404s=True, errors={
    'InternalServerError': {
        'message': 'Something went wrong',
        'status': 500,
    }
})

class Invoice(Resource):
    def post(self):
        # Get data from request
        sender_name = request.form['senderName']
        sender_address = request.form['senderAddress']
        sender_phone = request.form['senderPhone']
        sender_email = request.form['senderEmail']
        recipient_name = request.form['recipientName']
        recipient_address = request.form['recipientAddress']
        recipient_phone = request.form['recipientPhone']
        recipient_email = request.form['recipientEmail']
        invoice_number = request.form['invoiceNumber']
        invoice_date = request.form['invoiceDate']
        line_items = request.form.getlist('lineItems[]')
        subtotal = request.form['subtotal']
        tax = request.form['tax']
        total = request.form['total']
        notes = request.form['notes']

        # Import required modules
        

        # Set font styles
        title_style = ('Helvetica-Bold', 24)
        subtitle_style = ('Helvetica-Bold', 14)
        heading_style = ('Helvetica-Bold', 12)
        text_style = ('Helvetica', 12)

        # Create PDF file
        filename = f'{invoice_number}.pdf'
        doc = canvas.Canvas(filename, pagesize=letter)

        # Draw invoice content
        doc.setFont(*title_style)
        doc.setFillColor(HexColor('#4F81BD'))
        doc.drawString(1*inch, 10.5*inch, 'Invoice')

        doc.setFont(*subtitle_style)
        doc.drawString(1*inch, 10*inch, f'Invoice Number: {invoice_number}')
        doc.drawString(4*inch, 10*inch, f'Invoice Date: {invoice_date}')

        doc.setFont(*heading_style)
        doc.drawString(1*inch, 9*inch, 'Sender Information:')
        doc.setFont(*text_style)
        doc.drawString(1.2*inch, 8.7*inch, sender_name)
        doc.drawString(1.2*inch, 8.4*inch, sender_address)
        doc.drawString(1.2*inch, 8.1*inch, f'Phone: {sender_phone}')
        doc.drawString(1.2*inch, 7.8*inch, f'Email: {sender_email}')

        doc.setFont(*heading_style)
        doc.drawString(4*inch, 9*inch, 'Recipient Information:')
        doc.setFont(*text_style)
        doc.drawString(4.2*inch, 8.7*inch, recipient_name)
        doc.drawString(4.2*inch, 8.4*inch, recipient_address)
        doc.drawString(4.2*inch, 8.1*inch, f'Phone: {recipient_phone}')
        doc.drawString(4.2*inch, 7.8*inch, f'Email: {recipient_email}')

        doc.setFont(*heading_style)
        doc.drawString(1*inch, 7.2*inch, 'Line Items:')
        doc.line(1*inch, 7.1*inch, 7.5*inch, 7.1*inch)

        doc.setFont(*text_style)
        y = 6.8
        for item in line_items:
            description, quantity, unit_price = item.split(',')
            doc.drawString(1.2*inch, y*inch, description)
            doc.drawString(4*inch, y*inch, quantity)
            doc.drawRightString(7.5*inch, y*inch, f'${unit_price}')
            y -= 0.3

        doc.setFont(*heading_style)
        doc.drawString(1*inch, 5*inch, f'Subtotal:')
        doc.drawRightString(7.5*inch, 5*inch, f'${subtotal}')
        doc.drawString(1*inch, 4.7*inch, f'Tax:')
        doc.drawRightString(7.5*inch, 4.7*inch, f'${tax}')
        doc.setFont(*subtitle_style)
        doc.drawString(1*inch, 4.4*inch, f'Total:')
        doc.drawRightString(7.5*inch, 4.4*inch, f'${total}')

        doc.setFont(*heading_style)
        doc.drawString(1*inch, 3.8*inch, 'Notes:')
        doc.setFont(*text_style)
        notes_lines = notes.split('\n')
        y = 3.5
        for line in notes_lines:

            doc.drawString(1*inch, y*inch, line)
            y -= 0.3

        doc.save()

        # Close the PDF file
        doc_file = open(filename, 'rb')
        pdf_data = doc_file.read()
        doc_file.close()

        response = app.response_class(
            response=pdf_data,
            status=200,
            mimetype='application/pdf'
        )
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response


api.add_resource(Invoice, '/')


# Swipe App

Swipe App is a web application built with Flask and React that allows users to create and send invoices to their clients. This application provides an easy and convenient way to manage your billing and payment processes.

## Installation

To run Swipe App on your local machine, follow these steps:

1. Clone the repository by running `git clone https://github.com/hari-na/swipe-app.git` in your terminal.
2. Navigate to the `swipe-app` directory by running `cd swipe-app` in your terminal.
3. Create a virtual environment by running `python3 -m venv env` in your terminal.
4. Activate the virtual environment by running `source env/bin/activate` in your terminal.
5. Install the required Python packages by running `pip install -r requirements.txt` in your terminal.
6. Install the required Node.js packages by running `npm install` in your terminal.
7. Return to the `swipe-app` directory by running `cd ..` in your terminal.

## Usage

To start the Swipe App web application, follow these steps:

1. Activate the virtual environment by running `source env/bin/activate` in your terminal.
2. Navigate to the `swipe-app` directory by running `cd swipe-app` in your terminal.
3. Start the React development server by running `npm start` in your terminal.
4. Start the Flask web server by running `python3 app.py` in your terminal.
5. Open your web browser and navigate to `http://localhost:3000`.

Once the Swipe App web application is running, you can use it to create and send invoices to your clients. Simply follow the on-screen instructions to enter your invoice details and send it to your client.

## Secret Testing

Psst! If your Cross-Origin-Resource-Sharing isn't working, don't worry. Just make your PDF using the testApp.py file. A very crude but simple way to make your PDFs. Just replace the data with the relevant data that you'd like to generate your invoice with, and run it with `python3 testApp.py`, and you're on your way!

## Contributing

If you would like to contribute to Swipe App, please submit a pull request with your changes. We welcome any contributions that improve the application's functionality or user experience.

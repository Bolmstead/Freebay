<p align="center">

<h3 align="center">freeBay! An eBay Website Clone</h3>


  <p align="center">
    A website to allow users/instructors to create, schedule, and signup for yoga classes in Boise, Idaho.
    <br />
    <a href="https://yoga-website.herokuapp.com/">View Heroku Demo</a>
  </p>
</p>

![Website_pic](static/images/yoga_homepage.png?raw=true "website")

<!-- ABOUT THE PROJECT -->
## About The Project

This project was created as the Capstone 1 project for the Springboard Software Engineering Course. It will hopefully be used  operate as a website for the Lunchtime Yoga for Business Professionals group in the future. A user can do the following on the website:
* View the organization's information including pricing, instructor bios, contact methods, and social media links.
* Create an account with an encrypted password using bcrypt.
* Signup for available yoga classes using the website's interactive  calendar.
* View enrolled yoga classes and cancel any class signup.
* Edit current account information.
* Receive automatic emails confirming class signup, signup cancellation, or account creation.


Instructors are also able to do all of the above and are authorized to:
* Create/delete yoga classes.
* View all users signed up for their yoga class.
* View contact information of all users and instructors.

![Website_pic](static/images/dashboard.png?raw=true "website")

## Built With

The coding languages, frameworks, source code, and API that I used to build this project:
* Python
* Javascript
* HTML
* CSS
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Axios](https://www.npmjs.com/package/axios)
* [Jinja](https://jinja.palletsprojects.com/en/2.11.x/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Postgres](https://www.postgresql.org/)
* [SQL Alchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [Flask-Bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)
* [Font Awesome](https://fontawesome.com/)
* [Simple Calendar](https://github.com/brospars/simple-calendar)
* [SendGrid Email API](https://sendgrid.com/docs/api-reference/)


## How to Run the Project

To get a local copy up and running follow these steps:

### Clone Repo

1. Clone the repo by clicking on the green "Code" button at the top of the github repo page or by entering the following in your terminal:
   ```sh
   git clone https://github.com/Bolmstead/Yoga.git
   ```
2. (optional but recommended) Create a [virtual environment](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) in the same directory of the cloned, unzipped code.

### Library Installations

3. Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements.txt.

  ```sh
  pip install -r requirements.txt
  ```

### Postgres Installation

4. Install [Postgres](https://www.postgresql.org/).
5. Create a database named "yoga" in your terminal.
  ```sh
  createdb yoga
  ```
6. Start a server in your projects directory and you are done!


## Roadmap

Possible features that I would like to integrate into the website are:
* As requested by an instructor, an instructor could add any user to a class.
* Payment system to allow a user to pay/prepay for classes on the website.
* User having a class credits column that would deplete after they attend a class and can be refilled by an instructor if receive prepayments.
* Google calendar API that would allow a user to save their class signup to their google calendar. Also could be used for instructors when they create a class.


## Notes
For the sake of the capstone code review, any user can sign up to be an instructor on the website. This allows anyone to view the instructor's functionality. If this website were to be implemented, instructors accounts would be created in a different way requiring approval.

The source code for the calendar used on the website was pulled and maniputlated from [Simple Calendar](https://github.com/brospars/simple-calendar). Author of the Simple Calendar grants permission to any person to use, copy, modify, or publish the code. All documents regarding the Simple Calendar code are located in /static/calendar.

Enjoy!


## Contact

Berkley Olmstead - olms2074@gmail.com - [Linkedin](https://www.linkedin.com/in/berkleyolmstead/)

Project Link: [https://github.com/Bolmstead/Yoga](https://github.com/Bolmstead/Yoga)

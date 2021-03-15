<p align="center">

  <h2 align="center">FreeBay!</h2>


  <p align="center">
    A website where fake products are bid on with fake money.
    <br />
    <!-- <a href="https://yoga-website.herokuapp.com/">View Heroku Demo</a> -->
  </p>
</p>

![logo](public/images/logo.png?raw=true "logo")

<!-- ABOUT THE PROJECT -->
## About The Project

The freeBay website is an eBay clone that allows users to search for and bid on fake products. After a user creates an account, they receive 100 freeBay bucks that can be used to bid on any products. Each product has a time limit for how long it is held in auction. The user with the highest bid on a product at the end of the auction time limit, "wins" the product. 

Notifications, highest bids, and products a user has won can be viewed on their profile. All profiles are public, however notifications can only be seen by the owner. The most recent auction winners and trending products can be seen from the homepage. All product data was scraped from Amazon's Best Sellers web pages using Python.

* View


![Website_pic](static/images/dashboard.png?raw=true "website")

## Built With

The coding languages, frameworks, and libraries that I used to build this project:

Frontend
* [Javascript](https://www.javascript.com/)
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* HTML
* CSS
* [Axios](https://www.npmjs.com/package/axios)

Backend
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Node-PostgreSQL](https://node-postgres.com/)
* [JSON Schema](https://json-schema.org/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)



## How to Run the Project

To get a local copy up and running follow these steps:

....

<!-- ### Clone Repo

1. Clone the repo by clicking on the green "Code" button at the top of the page or enter in the following in your terminal:
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
6. Start a server in your projects directory and you are done! -->


## Roadmap

Stretch goals for this project:
* Search filter box for a list of searched products.
* Users add their own products and ratings for products they've won.
* Websocket chat feature.

## Contact

Berkley Olmstead - olms2074@gmail.com - [Linkedin](https://www.linkedin.com/in/berkleyolmstead/)

Project Links: [https://github.com/freebay-frontend](https://github.com/freebay-frontend)
               [https://github.com/freebay-backend](https://github.com/freebay-backend)
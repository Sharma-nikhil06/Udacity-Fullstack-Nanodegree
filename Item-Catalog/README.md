# Item Catalog Web App
This web app is a project of Item Catalog.
## About
This project is a RESTful web application utilizing the Flask framework which accesses a SQL database that populates categories and their items. OAuth2 provides authentication for further CRUD functionality on the application. Currently OAuth2 is implemented for Google Accounts.



## Installation
There are some dependancies and a few instructions on how to run the application.
Seperate instructions are provided to get GConnect working also.


## How to Install
1. Install Vagrant & VirtualBox
2. Clone the Udacity Vagrantfile
3. Go to Vagrant directory and either clone this repo or download and place zip here
3. Launch the Vagrant VM (`vagrant up`)
4. Log into Vagrant VM (`vagrant ssh`)
5. Navigate to `cd/vagrant` as instructed in terminal
6. The app imports requests which is not on this vm. Run sudo pip install requests
7. Setup application database `python /item-catalog/database_setup.py`
8. Run application using `python /item-catalog/app.py`
9. Access the application locally using http://localhost:5000

## Using Google Login
To get the Google login working there are a few additional steps:

1. Go to [Google Dev Console](https://console.developers.google.com)
2. Sign up or Login if prompted
3. Go to Credentials
4. Select Create Crendentials > OAuth Client ID
5. Select Web application
6. Enter name 'Item-Catalog'
7. Authorized JavaScript origins = 'http://localhost:5000'
8. Authorized redirect URIs = 'http://localhost:5000/login' && 'http://localhost:5000/gconnect'
9. Select Create
10. Copy the Client ID and paste it into the `data-clientid` in login.html
11. On the Dev Console Select Download JSON
12. Rename JSON file to client_secrets.json
13. Place JSON file in item-catalog directory that you cloned from here
14. Run application using `python /item-catalog/app.py`

## JSON Endpoints
The following are open to the public:

Catalog JSON: `/catalog/JSON`
    - Displays the whole catalog. Categories and all items.

Categories JSON: `/catalog/categories/JSON`
    - Displays all categories

Category Items JSON: `/catalog/<path:category_name>/items/JSON`
    - Displays items for a specific category

Category Item JSON: `/catalog/<path:category_name>/<path:item_name>/JSON`
    - Displays a specific category item.

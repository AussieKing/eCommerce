# Ecommerce  ![License](https://img.shields.io/badge/license-MIT-blue.svg)

  ## Description

 The purpose of this project is to provide a comprehensive e-commerce store management tool. By utilizing the application's features, the end user gains the ability to efficiently organize products, categorize them, define specifications through tags, and easily add, update, or remove items based on stock availability..

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Credits](#credits)
  - [Questions](#questions)
  
  ## Installation

  To begin, please follow these steps:

  Visit the GitHub repository at https://github.com/AussieKing/eCommerce.

  Open a local built-in Terminal on your machine, such as PowerShell or Bash.

  Choose a desired folder on your local machine where you want to store the project. Navigate to this folder using the 'cd "folder_name"' command.

  Copy the repository to your local computer by executing the command "git clone git@github.com:AussieKing/eCommerce.git" using the 'git clone' command.
  
  ## Usage

  Open the built-in terminal in VS Code. Ensure that you have installed all the required packages by running 'npm install' or 'npm i' from the main folder.

  Prior to running the program, start the database by entering 'mysql -u root -p' in the terminal. Please note you will need to set up your own password/username in an .env file if you havent't done this before. After providing your password, type 'source schema.sql;' from the db folder, to create or reload the database.

  Now that the database is set up, return to the main folder and execute the command 'npm run seed' to populate the database with the initial dummy data for testing purposes.
  
![Screen Shot 2023-06-27 at 6 04 59 pm](https://github.com/AussieKing/eCommerce/assets/126050763/7e078ad3-3625-4eab-8401-fcc6815c2cd5)

  You can now launch the application by running the command 'npm start' , or 'nodemon server.js'.

![Screen Shot 2023-06-27 at 6 06 25 pm](https://github.com/AussieKing/eCommerce/assets/126050763/d9cc5a16-ca95-4d1c-88d4-45ce277c294c)


  Now that the application is talking to the local port, you can start debugging (I use Insomnia).

  With Insomnia, you can execute the application's creation routes and obtain the results in a JSON format.
  The screennshot below demonstrates how Insomnia should present information when a route is requested.
  
![Screen Shot 2023-06-27 at 6 11 35 pm](https://github.com/AussieKing/eCommerce/assets/126050763/16ba2171-3de2-471b-9163-259c61dd0762)



  
  ## Walk-through video
  
  On [this link]() you will be able to see a walkthrough video of the whole application, from start to end, inclusive of all CRUD operations.

  
  ## License

  This application is covered under the MIT license.
  
  ## Contributing

  Contributions are not accepted at this time, as this assignment is part of a 24 weeks Full Stack Bootcamp.
  
  ## Credits

  All our awesome teachers, TAs, and Tutors!
  Shields.io for providing the license badge.
  MySQL and Sequelize for the db handling.
    

  ## Questions
  
  For any questions or inquiries, please reach out to me via [GitHub](https://github.com/AussieKing/) or email me at fede.dordoni@gmail.com.
    

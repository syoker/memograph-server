# MemoGraph Server

This is the local server where any VASH client will connect. It is written in TypeScript with the NodeJS framework.

## Requirements

1. Have [MySQL Workbench](https://www.mysql.com/products/workbench/) with MySQL Server installed.
   > - MySQL Workbench brings a MySQL Server installer on windows.
   > - In the MySQL Workbench (Windows) installation, when you get to the MySQL Server configuration, in the authentication methods section, select the "Use Legacy Authentication Method" option, since the MySQL module does not yet support the new authentication method.
   > - Uncheck the Safe Updates option under "Edit > Preferences > SQL Editor" in your Local Instance.
2. Have [NodeJS](https://nodejs.org/download/release/v18.16.1/) v18.16.1 installed.
3. Have [Visual Studio Code](https://code.visualstudio.com/) or some other code editor installed.

## Steps to build this project

1.  Download the latest release and unzip it.
2.  Inside the folder, open your code editor and create the file ".env.local".
3.  Inside the file, copy this code, delete comments and change the values as needed.

    ```dotenv
    # .env.local

    DATABASE_PORT="3306" # The port where MySQL Server is running.
    DATABASE_PASSWORD="password" # The password of your local instance.

    AMOUNT_HASH_SALT="10" # The amount of salt the hashed password will have (more salt = more security but slower).
    SESSION_AUTH_MULTIPLIER="30" # A multiplier for the authentication code that is stored in cookies. Do not show this number (a larger multiplier does not equal greater security, so choose a random number).

    SERVER_PORT="4500" # The port on which the server will be initialized
    ```

4.  Inside the folder open the terminal.
5.  Run this command to install the required modules.
    ```bash
    npm install
    ```
6.  Run this command to compile the project.
    ```bash
    npm run build
    ```
7.  Run this command to create the database and the corresponding folders.
    ```bash
    npm run setup
    ```
8.  Run this command to run the server
    ```bash
    npm start
    ```

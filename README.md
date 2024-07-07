# Technical test

This project consists of register, login/logout functionality. It also contains a home page and a page for returning the logged in users details.
The stack used for this consists of:

- Node.js
- React
- Redux
- MongoDb
- Jwt

# To get this project on your local machine you can choose one of the following options:

# clone it onto your machine.

- In VSCode, open the command line palette (Ctrl + Shift + P (Windows/Linux) or Cmd + Shift + P (Mac).).
- Type 'Git: Clone' and select 'Git: Clone' from the list.
- Go to the repo in github, click on the '<> Code' button.
- Make sure the tab in the overlay is on HTTPS, and click on the copy to clipboard icon to the right of the URL
- Now, back in VSCode, enter the URL of the git hub repo you just copied.
- Select the destination folder.
- Once the repository is cloned, you will be promped to open it. Click on 'open'.

# Download ZIP

- In github, on the main page of the repo, click on the '<> Code' button
- Select 'Download ZIP' from the overlay
- In your machine, extract the project from the ZIP folder.
- Open an empty project in VSCode
- Drag the unzipped folder into VSCode
- It will ask if you want to trust the author
- Select Trust Author

# Intalling dependencies

Now you need to install the dependencies into both folders. To do this you need to:

- Open a new terminal in VSCode (To do this, select 'Terminal' on the top bar and then select 'New' in the dropdown
- Run the following command:
  `cd server`
- That will take you into the server folder.
- Now run the following command:
  `npm install`
- That will install all needed dependices for the server folder
- Now, open a new terminal window (Keep the server one open)
- You can do this by clicking on the '+' optin on the right hand side:
  <img width="145" alt="image" src="https://github.com/JMacPherson95/Technical-test/assets/128514017/fef57169-741f-458e-8098-2c73af65f270">
- Once in that new terminal, run the following command:
  `cd frontend`
- That will take you into the frontend folder
- Next, run the following command:
  `npm install`
- That will install all needed dependencies for the frontend folder

# Starting the server

- Navigate back to the terminal window you have that is currently in the server directory
- In there, run the following command:
  `npm start`
- Doing that will start the server

# Starting the frontend

- Navigate back to the terminal window that is currently in the frontend directory
- In there, run the following command:
  `npm run dev`
- Doing that will start the frontend (Vite)
- On your browser, navigate to localhost:5173

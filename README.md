# Chat-Room
# Introduction
This project is built to study [SSE (Server-Sent Events)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).
To do so, I generated a chat room that allows users to log in with their names, see who is connected, and send messages.

## React Usage 
In this project, I have done major usage in react. 
Every element in the page is built by components of react.
I also use React to route between the login page to my chat page. 
This reduces the number of requests that the front needs to send to the back and also makes the running time much faster.

## SSE
The server side is working on EventEmmitter, a class in JavaScript that lets me create events and a way to sign that the event happened. 
In this way, I can sign every time that user logged in or logged out and in any message the users send. 
What help me to update the data in the front and refresh the page to show me the new data. 


## How to run 
For now, the chat room has no deployment so to use it you need to do The following orders:
1. Download this repo
2. Open 2 terminals on your IDE
3. `npm i` on the `server` folder
4. Add `.env` file inside the `server` folder that includes this config:
    - MONGO_URI=`<Database connection>`
    - JWT_SECRET=`<Secret key (choose whatever you like)>`
    - ACCESS_TIME=`<12h>`
    - REFRESH_TIME=`<36h>`
5. `npm start` to run the server 
6. On the second terminal `cd client`
7. `npm i` on this folder
8. `npm run start` on this `chat-Room-typescript/client` root to run the client side of the project

## Languages and Tools:

[<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />][webdevplaylist]
[<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />][webdevplaylist]
[<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />][webdevplaylist]
[<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />][webdevplaylist]
[<img align="left" alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />][webdevplaylist]
[<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />][webdevplaylist]
[<img align="left" alt="MongoDB" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png" />][webdevplaylist]
[<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />][webdevplaylist]
[<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />][webdevplaylist]

<br />
<br />


[webdevplaylist]: https://www.suvelocity.org/
# Optiva Challenge

_This project tries to solve the challenge sent as a technical test for the backend position_
## Starting 🚀

_These instructions will allow you to get a working copy of the project on your local machine for development and testing purposes._

### Previous requirements 📋

_To get this application up, you must have:_

```
git
docker
docker-compose
internet connection
```

### Installation 🔧

_Installation steps_

_clone the repository wherever you want_

```
git clone https://github.com/jog0nru/optivaChallenge.git
```

_being in the main directory (within optivaChallenge directory), execute_

```
docker-compose up 
```

_In the terminal you are going to see the working logs_

💡 _If you want to see the debug logs only have to change the environment variable in the docker-compose yml file from LOG_LEVEL: info to LOG_LEVEL: debug or just create .env file in src folder with de LOG_LEVEL variable inside_

## Execute tests ⚙️

_To execute tests you shold follow this steps_
```
start the application with docker-compose
```
```
go to the project directory and enter to the src folder
```
```
once there, execute npm run test
```
```
the complete test suite will be executed
```
_we need to run the application because we need to have all the dependencies installed. done once, we can execute the test suite whenever_

## Services 🎛
_With docker compose running, several services are raised._
* Backend: It is an api that when starting up, executes a database update process against the scryfall api, then it exposes two endpoints to get the data.
* Mongodb: It is a database server.
* Mongo express: It is a client to quickly access the data stored in the database (http://localhost:8081/)
* Nginx: It is a web server that makes the frontend accessible to interact with data. (http://localhost) 

## Questions?
_If you have any questions do not hesitate to contact me_ 📧 jogonru86@gmail.com
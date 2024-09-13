# TS SERVER

This server created using TS, Node, and Express will run locally on your computer. It is the backend of JS/TS/REACT not sure, client which let you upload and manage images as a personal gallery.

## Instalations

1. You need to install nodeJS on you computer [Download Node](https://nodejs.org/en)


2. Download MongoDB Community Server to your computer to run it locally and install it: [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)


3. Also it will be good to manage the db install [MongoDB Compass](https://www.mongodb.com/products/tools/compass)


4. After that you need to install the dependecies:
    1. open a terminal
    2. move to the folder project
    3. execute the follow command:
        ```bash
        npm install
        ```
    4. Now you can run it using:
        ```bash
        npm start
        ```

5. Now you have this running you must run the client.



### Considerations

1. sometimes a ghost procces of the node is still running and i get an error
the port is already in use, to fix it:

```bash
taskkill /F /IM node.exe
```

// also need to install coors and its types to get it work
// npm install cors
// npm i --save-dev @types/cors
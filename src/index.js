import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const http = require('http');
const httpServer = http.createServer();

// Mes origines acceptées
const allowOrigins = ['http://app.exemple.com', 'http://autre.exemple.com'];

httpServer.on('request', (request, response) => {

    // On test si l'entête "Origin" fait partie des origines acceptées
    if (request.headers['origin'] && allowOrigins.includes(request.headers['origin'])) {

        // Si oui alors on renseigne "Access-Control-Allow-Origin" avec l'origine de la requête
        response.setHeader('Access-Control-Allow-Origin', request.headers['origin']);
    } else {

        // Sinon on renseigne "Access-Control-Allow-Origin" à null créant une erreur CORS dans le navigateur
        response.setHeader('Access-Control-Allow-Origin', 'null');
    }

    if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

        return response.end();
    }
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'))
    });
reportWebVitals();
httpServer.listen(8080);

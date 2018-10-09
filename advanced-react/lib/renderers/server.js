import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from '../components/App';
import config from '../config';
import DataApi from '../state-api';

const serverRender = async () => {
    const { host, port } = config;
    const resp = await axios.get(`http://${host}:${port}/data`);
    const api = new DataApi(resp.data);
    
    const initialData = {
        articles: api.getArticles(),
        authors: api.getAuthors(),
    };
    
    return {
        initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
        initialData
    };
}

export default serverRender;
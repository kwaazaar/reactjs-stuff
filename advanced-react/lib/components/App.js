import React from 'react';
import DataApi from '../DataApi';
import { data } from '../testData';

import ArticleList from './ArticleList';

const api = new DataApi(data);

class App extends React.Component {

    articleActions = {
        lookupAuthor: a => this.state.authors[a.authorId]
    };

    constructor() {
        super();
        this.state = {
            articles: api.getArticles(),
            authors: api.getAuthors(),
        };
    }

    render() {
        return (
            <div>
                <ArticleList articles={this.state.articles} actions={this.articleActions} />
            </div>
        );
    }
}

export default App;
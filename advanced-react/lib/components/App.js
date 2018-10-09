import React from 'react';
import DataApi from '../state-api';
import axios from 'axios';

import ArticleList from './ArticleList';

class App extends React.Component {
    state = {
        articles: this.props.initialData.articles,
        authors: this.props.initialData.authors,
    };
    articleActions = {
        lookupAuthor: a => this.state.authors[a.authorId]
    };

    // // Async load of data is no longer needed, since server supplied it
    // async componentDidMount() {
    //     const resp = await axios.get('/data');
    //     const api = new DataApi(resp.data);
    //     this.setState(() => ({
    //         articles: api.getArticles(),
    //         authors: api.getAuthors(),
    //     }));
    // };

    render() {
        return (
            <div>
                <ArticleList articles={this.state.articles} actions={this.articleActions} />
            </div>
        );
    }
}

export default App;
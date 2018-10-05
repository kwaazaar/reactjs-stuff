import React from 'react';

import Article from './Article';

const ArticleList = (props) => {
    const {articles, actions } = props;
    return (
        <div>
            {Object.values(articles).map(a => {
                return (
                    <Article key={a.id} article={a} author={actions.lookupAuthor(a)} />
                );
            }
            )}
        </div>
    );
};

export default ArticleList;
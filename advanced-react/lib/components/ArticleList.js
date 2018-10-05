import React from 'react';

import Article from './Article';

const ArticleList = (props) => {
    const {articles, authors } = props;
    console.log(articles);
    return (
        <div>
            {Object.values(articles).map(a => {
                return (
                    <Article key={a.id} article={a} author={authors[a.authorId]} />
                );
            }
            )}
        </div>
    );
};

export default ArticleList;
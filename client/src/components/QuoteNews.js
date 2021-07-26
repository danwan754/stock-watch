import React from 'react';

import '../css/components/QuoteNews.css';

function QuoteNews(props) {

    const { news } = props;

    return (
        // <div className="quote-news-container">
        <div>
            { news.length > 0 ?
                <div className="quote-news-container">
                    {news.map(item => (
                        <a href={item.url} target="_blank" rel="noreferrer" key={item.url}>
                            <h4>{item.headline}</h4>
                            <p>
                                <img src={item.image} alt="news" width='150px' height='100px' />
                                {item.summary}
                            </p>
                            <span className="news-source">{item.source}</span>
                        </a>
                    ))}
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default QuoteNews;
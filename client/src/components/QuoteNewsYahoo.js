import React from 'react';

function QuoteNewsYahoo(props) {

    const { news } = props;

    const convertDateTime = (dateString) => {
        const dateObj = new Date(dateString);

        // remove the GMT ending of date string
        const dateFrags = dateObj.toString().split(' ').slice(0,5);

        // remove the seconds in the time
        dateFrags[4] = dateFrags[4].split(':').slice(0,2).join(':');
        
        return dateFrags.join(' ');
    }

    return (
        <div>
            {news.length > 0 && (
                <div className="quote-news-container">
                    {news.map(item => (
                        <a href={item.link} target="_blank" rel="noreferrer" key={item.link}>
                            <h4>{item.title}</h4>
                            <p>
                                {item.description}
                            </p>
                            <span className="news-source">{convertDateTime(item.pubDate)}</span>
                        </a>
                    ))}

                </div>
            )}
        </div>
    )
}

export default QuoteNewsYahoo;
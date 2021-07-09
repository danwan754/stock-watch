const cleanYahooNewsArray = (arr) => {
    return arr.map(item => (
        {
            description: item.description[0],
            link: item.link[0],
            pubDate: item.pubDate[0],
            title: item.title[0]
        }
    ));
}

export {
    cleanYahooNewsArray
}
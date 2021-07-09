import React from 'react';

function QuoteDetails(props) {

    const { company } = props;
    const intNumFt = new Intl.NumberFormat('en-US')

    const formatNum = (num) => {
        if (num == null) {
            return 'N/A';
        }
        return intNumFt.format(num.toFixed(2));
    }

    return (
        <div className="result-container">
            <div className="company-heading-container">
                <img src={company.logoURL}  alt="company logo" width="75px" height="75px"/>
                <p className="company-heading-details">
                    <span>{company.symbol}</span>:&nbsp; 
                    <span>{company.companyName}</span> &nbsp;
                    <span className="latestPrice">{company.latestPrice}</span> &nbsp;
                    <span className={company.changePercent < 0 ? 'negative-color' : 'positive-color'}>{(formatNum(company.changePercent * 100))} %</span> &nbsp;
                    <span className={company.changePercent < 0 ? 'negative-color' : 'positive-color'}>({formatNum(company.change)})</span>
                </p>
            </div>
            <div className="company-main-container">
                <table>
                    <tbody>
                        <tr>
                            <td>High:</td>
                            <td>{formatNum(company.high)}</td>
                        </tr>
                        <tr>
                            <td>Low:</td>
                            <td>{formatNum(company.low)}</td>
                        </tr>
                        <tr>
                            <td>Volume:</td>
                            <td>{formatNum(company.latestVolume)}</td>
                        </tr>
                        <tr>
                            <td>P/E:</td>
                            <td>{formatNum(company.peRatio)}</td>
                        </tr>
                        <tr>
                            <td>Market Cap:</td>
                            <td>{formatNum(company.marketCap)}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Previous close:</td>
                            <td>{formatNum(company.previousClose)}</td>
                        </tr>
                        <tr>
                            <td>Previous volume:</td>
                            <td>{formatNum(company.previousVolume)}</td>
                        </tr>
                        <tr>
                            <td>52 week high:</td>
                            <td>{formatNum(company.week52High)}</td>
                        </tr>
                        <tr>
                            <td>52 week low:</td>
                            <td>{formatNum(company.week52Low)}</td>
                        </tr>
                        <tr>
                            <td>Year-to-date change:</td>
                            <td>{formatNum((company.ytdChange * 100))} %</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="company-news-container">
                <div>

                </div>
            </div>
        </div>
    )
}

export default QuoteDetails;
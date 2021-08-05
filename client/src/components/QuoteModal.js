import React, { useState } from 'react';
import { COMPANY_RESET } from '../constants/companyConstants';
import ListsForm from './ListsForm';
import QuoteDetails from './QuoteDetails';
import QuoteNewsYahoo from './QuoteNewsYahoo';
import '../css/components/QuoteModal.css';

function QuoteModal(props) {

    const { company } = props;
    const [viewForm, setViewForm] = useState(false);

    const handleReset = () => {
        props.dispatch({ type: COMPANY_RESET });
    }

    const handleViewForm = () => {
        setViewForm(!viewForm);
    }

    return (
        <div className="quote-modal-container">
            <div className="quote-modal-content">
                <input type='button' onClick={handleReset} className="modal-exit-button" value="x" />
                <div className="quote-modal-results-wrapper">
                    <QuoteDetails company={company.companyObj} />
                    <div className="modal-add-to-list-container">
                        <input type="button" value={viewForm ? "<<":"Add to list"} className="modal-add-to-list-button" onClick={handleViewForm}/>
                        {viewForm ? <ListsForm /> : ''}
                    </div>
                </div>
                <div className="quote-results-wrapper">
                    {/* <QuoteNews news={news} /> */}
                    <QuoteNewsYahoo news={company.news} />
                </div>
            </div>
        </div>
    )
}

export default QuoteModal;
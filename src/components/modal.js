import React from "react";
import update from "./update.module.css";

const ResultModal = props => {
    const redirect = `http://${props.yourHref}`;
    return props.show ? (
        <div>
            <div>
                <p>Your trimmed URL is:</p>
                <p><a rel="noopener noreferrer" href={redirect} target="_blank" >{props.newURL}</a></p>
            </div>
            <button className={update.closeButton} onClick={props.closed}>
                x
            </button>
        </div>
    ) : null;
};

export default ResultModal;

import React from "react";
import update from "./update.module.css";

const ResultModal = props => {
    const redirect = `http://${props.yourHref}`;
    const cssModal = [
        update.Modal,
        props.show ? update.ModalOpen : update.ModalClosed
    ];
    return props.show ? (
        <div className={ cssModal.join(" ")}>
            <img className={update.catImage} src="https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_cat_emoji_icon_87ab6b39-5f08-48a5-a89a-1f5d3312e159_large.png?v=1542446802"/>
            <h1 className={update.header}>Hurray!</h1>
            <p>Your trimmed URL is:</p>
            <p><a rel="noopener noreferrer" href={redirect} target="_blank" >{props.newURL}</a></p>
            <button className={update.closeButton} onClick={props.closed}>
                x
            </button>
        </div>
    ) : null;
};

export default ResultModal;

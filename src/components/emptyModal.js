import React from "react";
import update from "./update.module.css";

const EmptyModal = props => {
    const cssModal = [
        update.Modal,
        props.isRendered ? update.ModalOpen : update.ModalClosed
    ];
    return props.isRendered ? (
        <div className={ cssModal.join(" ")}>
            <img className={update.catImage} src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crying-cat-face.png"/>
            <h1 className={update.header}>Meowww!</h1>
            <p>You forgot to feed me a url to claw in half!</p>
            <button className={update.closeButton} onClick={props.closed}>
                x
            </button>
        </div>
    ) : null;
};

export default EmptyModal;

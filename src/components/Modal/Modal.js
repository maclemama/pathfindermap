import "./Modal.scss";
import SVGIcons from "../SVGIcons/SVGIcons";

function Modal({ title, message, setModal }) {
    const handleClose = ()=>{
        setModal([]);
    }
	return (
		<div className="modal">
			<div className="modal__top-wrapper">
				<h2 className="modal__title">{title}</h2>
				<button className="modal__close-button" onClick={handleClose}>
					<SVGIcons iconName="cancel" cssClassName="modal__close-icon" />
				</button>
			</div>
			<p className="modal__message">{message}</p>
			<button className="modal__confirm-button" onClick={handleClose}>OK</button>
		</div>
	);
}

export default Modal;

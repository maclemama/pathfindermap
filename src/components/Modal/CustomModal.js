import "./Modal.scss";

import SVGIcons from "../SVGIcons/SVGIcons";

function CustomModal({ customModal, customModalFunc, customModalCloseFun }) {
	return (
		customModal && (
			<div className="modal">
				<div className="modal__top-wrapper">
					<h2 className="modal__title">{customModal?.title}</h2>
					<button className="modal__close-button" onClick={customModalCloseFun}>
						<SVGIcons iconName="cancel" cssClassName="modal__close-icon" />
					</button>
				</div>
				<p className="modal__message">{customModal?.message}</p>
				<div className="modal__bottom-wrapper">
					<button className="modal__confirm-button" onClick={customModalFunc}>
						{customModal?.confirmText ? customModal?.confirmText : "OK"}
					</button>
					{customModal?.cancelText && (
						<button
							className="modal__confirm-button"
							onClick={()=>customModalCloseFun()}
						>
							{customModal?.cancelText ? customModal?.cancelText : "Cancel"}
						</button>
					)}
				</div>
			</div>
		)
	);
}

export default CustomModal;

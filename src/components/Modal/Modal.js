import "./Modal.scss";

import { useDispatch, useSelector } from "react-redux";

import { clearModal } from "../../store/modal/modalSlice";
import { selectModalContent } from "../../store/modal/modalSelector";

import SVGIcons from "../SVGIcons/SVGIcons";

function Modal() {
	const dispatch = useDispatch();
	const modalContent = useSelector(selectModalContent);

	const handleClose = () => {
		dispatch(clearModal());
	};
	return (
		modalContent && (
			<div className="modal">
				<div className="modal__top-wrapper">
					<h2 className="modal__title">{modalContent.title}</h2>
					<button className="modal__close-button" onClick={handleClose}>
						<SVGIcons iconName="cancel" cssClassName="modal__close-icon" />
					</button>
				</div>
				<p className="modal__message">{modalContent.message}</p>
				<button className="modal__confirm-button" onClick={handleClose}>
					OK
				</button>
			</div>
		)
	);
}

export default Modal;

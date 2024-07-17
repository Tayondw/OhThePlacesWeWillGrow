import { useModal } from "../../context/Modal";

const OpenModalMenuItem = ({
	modalComponent, // component to render inside the modal
	itemText, // text of the menu item that opens the modal
	onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
	className,
}) => {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		if (modalComponent) setModalContent(modalComponent);
		if (typeof onItemClick === "function") onItemClick();
	};

	return (
		<p className={className} onClick={onClick}>
			{itemText}
		</p>
	);
};

export default OpenModalMenuItem;

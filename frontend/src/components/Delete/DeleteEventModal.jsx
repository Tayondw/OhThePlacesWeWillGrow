import { useModal } from "../../context/Modal";
import { csrfFetch } from "../../store/csrf";
import "./DeleteEvent.css";

const DeleteEventModal = ({eventDetail, navigate}) => {
	const { closeModal } = useModal();

	const yesDelete = async (event) => {
            event.preventDefault();
            const response = await csrfFetch(`/api/events/${eventDetail.id}`, {
				method: "DELETE",
            });
            
            if (response.ok) {
                  console.log("Event deleted successfully");
                  closeModal();
                  navigate("/events");
            }
	};

	const noDelete = async (event) => {
		event.preventDefault();
		closeModal();
	};

	console.log("THIS IS THE EVENT", eventDetail);

	return (
		<div id="deleteMenu">
			<h1>Confirm Delete</h1>
			<h3>Are you sure you want to remove this event?</h3>
			<div>
				<button
					style={{ backgroundColor: "red" }}
					value="delete"
					type="submit"
					onClick={yesDelete}
				>
					Yes (Delete Event)
				</button>
				<button style={{ backgroundColor: "darkgray" }} onClick={noDelete}>
					No (Keep Event)
				</button>
			</div>
		</div>
	);
};

export default DeleteEventModal;

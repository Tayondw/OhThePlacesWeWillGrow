import { useLoaderData } from "react-router-dom";

const CreateEvent = () => {
      const allEvents = useLoaderData();
      console.log("CHECK ALL GROUPS", allEvents);
	return null;
};

export default CreateEvent;

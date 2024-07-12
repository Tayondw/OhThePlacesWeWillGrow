import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

const LoginFormModal = () => {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div className="body">
			<div className="ring">
				<i style={{ borderColor: "#00ff0a" }}></i>
				<i style={{ borderColor: "#ff0057" }}></i>
				<i style={{ borderColor: "#fffd44" }}></i>

				<div className="login">
					<h1>Log In</h1>
					<form onSubmit={handleSubmit}>
						<label>
							<input
								type="text"
								value={credential}
								onChange={(event) => setCredential(event.target.value)}
								required
								placeholder="Username or Email"
							/>
						</label>
						<label>
							<input
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								placeholder="Password"
							/>
						</label>
						{errors.credential && <p>{errors.credential}</p>}
						<div>
							<button type="submit">Log In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginFormModal;

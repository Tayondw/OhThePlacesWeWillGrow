import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";
import growthUpimg from "../../assets/growthup_logo_img.png";

const LoginFormModal = () => {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const isDisabled = credential.length < 4 || password.length < 6;

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

	const demoUserLogin = async (event) => {
		event.preventDefault();
		setErrors({});
		return dispatch(
			sessionActions.login({ credential: "Demo-lition", password: "password" })
		)
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
				<i style={{ borderColor: "#135C51" }}></i>
				<i style={{ borderColor: "#FFC3C3" }}></i>
				<i style={{ borderColor: "#FF5E5E" }}></i>

				<div className="login">
					<form className="form" onSubmit={handleSubmit}>
						<div>
							<img className="image" src={growthUpimg} alt="growthup image" />
							<h1>Log In</h1>
						</div>
						<div>
							<input
								className="input"
								type="text"
								value={credential}
								onChange={(event) => setCredential(event.target.value)}
								required
								placeholder="Username Or Email"
							/>
						</div>
						<div>
							<input
								className="input"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								placeholder="Password"
							/>
							{errors.credential && (
								<p style={{ color: "red" }}>{errors.credential}</p>
							)}
						</div>
						<div>
							<button
								className="login-button"
								type="submit"
								disabled={isDisabled}
								style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
							>
								Log In
							</button>
						</div>
						<div>
							<button className="login-button" onClick={demoUserLogin}>
								Log in as Demo User
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginFormModal;

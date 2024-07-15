import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupFormModal.css";
import growthUpimg from "../../assets/growthup_logo_img.png";

const SignupFormModal = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const isDisabled = username.length < 4 || password.length < 6;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field",
		});
	};

	return (
		<div className="body">
			<div className="ring">
				<i style={{ borderColor: "#135C51" }}></i>
				<i style={{ borderColor: "#FFC3C3" }}></i>
				<i style={{ borderColor: "#FF5E5E" }}></i>

				<div className="login">
					<form className="form-signup" onSubmit={handleSubmit}>
						<div>
							<img
								className="signup-img"
								src={growthUpimg}
								alt="growthup image"
							/>
							<h1>Sign Up</h1>
						</div>
						<div>
							<input
								className="input-su"
								type="text"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								placeholder="Email"
							/>
							{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
						</div>
						<div>
							<input
								className="input-su"
								type="text"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								required
								placeholder="Username"
							/>
							{errors.username && (
								<p style={{ color: "red" }}>{errors.username}</p>
							)}
						</div>

						<div>
							<input
								className="input-su"
								type="text"
								value={firstName}
								onChange={(event) => setFirstName(event.target.value)}
								required
								placeholder="First Name"
							/>
							{errors.firstName && (
								<p style={{ color: "red" }}>{errors.firstName}</p>
							)}
						</div>

						<div>
							<input
								className="input-su"
								type="text"
								value={lastName}
								onChange={(event) => setLastName(event.target.value)}
								required
								placeholder="Last Name"
							/>
							{errors.lastName && (
								<p style={{ color: "red" }}>{errors.lastName}</p>
							)}
						</div>

						<div>
							<input
								className="input-su"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								placeholder="Password"
							/>
							{errors.password && (
								<p style={{ color: "red" }}>{errors.password}</p>
							)}
						</div>
						<div>
							<input
								className="input-su"
								type="password"
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
								required
								placeholder="Confirm Password"
							/>
							{errors.confirmPassword && (
								<p style={{ color: "red" }}>{errors.confirmPassword}</p>
							)}
						</div>
						<div>
							<button
								className="signup"
								type="submit"
								disabled={isDisabled}
								style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignupFormModal;

import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./LoginForm.css";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to="/" replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data?.errors) setErrors(data.errors);
			}
		);
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
								onChange={(e) => setCredential(e.target.value)}
                                                required
                                                placeholder="Username or Email"
							/>
						</label>
						<label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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

export default LoginFormPage;

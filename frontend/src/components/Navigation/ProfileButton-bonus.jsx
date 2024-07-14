import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { redirect } from "react-router-dom";

const ProfileButton = ({ user }) => {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
            closeMenu();
            redirect("/");
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button onClick={toggleMenu}>
				<FaUserCircle size={28}/>
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>{user.username}</li>
						<li>
							Hello, {user.firstName}
						</li>
                                    <li>{user.email}</li>
                                    <hr></hr>
						<li>
							<button onClick={logout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						<li>
							<OpenModalButton
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</li>
						<li>
							<OpenModalButton
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</li>
					</>
				)}
			</ul>
		</>
	);
}
export default ProfileButton;

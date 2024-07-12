import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user }) => {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (event) => {
		event.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (event) => {
			if (ulRef.current && !ulRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (event) => {
		event.preventDefault();
		dispatch(sessionActions.logout());
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button onClick={toggleMenu}>
				<FaUserCircle />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				<li>{user.username}</li>
				<li>
					{user.firstName} {user.lastName}
				</li>
				<li>{user.email}</li>
				<li>
					<button onClick={logout}>Log Out</button>
				</li>
			</ul>
		</>
	);
};

export default ProfileButton;

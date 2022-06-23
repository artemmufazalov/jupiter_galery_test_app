import React from 'react';

import logo from '../assets/logo.svg';

function Header() {
	return (
		<header className={'header'}>
			<div className="header__top">
				<span className="header__top__logo">
					<img src={logo} alt="Логотип" />
					<span>Agency</span>
				</span>
				<nav className="header__top__nav">
					<span>About</span>
					<span>Services</span>
					<span>Pricing</span>
					<span>Blog</span>
				</nav>
				<button className="header__top__contact-button">CONTACT</button>
			</div>
			<div className="header__bottom">
				<h2>Portfolio</h2>
				<div>
					Agency provides a full service range including technical
					skills, design, business understanding.
				</div>
			</div>
		</header>
	);
}

export default Header;

import React from 'react';
import logo from '../img/logo.svg'
export function Footer() {
	return (
		<footer className="fixed-bottom mt-auto footer bg-dark text-light py-2">
			<div className="container">
				<span className="text-light">
                <img src={logo} className="App-logo" alt="logo" />
                    Made by{" "}
					<a
						className="text-light"
						href="https://github.com/joaquindiazalvarez">
						Joaquín Díaz
					</a>
					, with love!
                    <img src={logo} className="App-logo" alt="logo" />
				</span>
			</div>
		</footer>
	);
}
import * as React from "react";

import { RegionSelect } from "./RegionSelect.js";
import { LogoutButton } from "./LogoutButton.js";



export function Header( props )
{
	return (
		<header id="js__header" className="grid-container">
			<section className="grid-row">
				<nav className="grid-cols-24">
					<div className="productheader">
						<a href="/" target="_blank"><i className="areall-icon icon-spacing"></i></a>
					</div>

					<RegionSelect />

					<div className="header__global-nav">
						<div className="header__global-menu">
							<nav className="globalnav__menu-bar">
								<ul>
									<LogoutButton />
								</ul>
							</nav>
						</div>
					</div>
				</nav>
			</section>
		</header>
	);
}
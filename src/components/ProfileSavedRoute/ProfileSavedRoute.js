import "./ProfileSavedRoute.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import RouteDetailsPanel from "../RouteDetailsPanel/RouteDetailsPanel";

function ProfileSavedRoute({ mapRef, signedin }) {
	const token = localStorage.getItem("token");
	const [savedRoute, setSavedRoute] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(null);
	useEffect(() => {
		if (token) {
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/route/page/${currentPage}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setTotalPage(res.data.total_page);
					let routeIDs = res.data.data.map((route) => route.id);
					if (res.data.total_page !== 0) {
						axios
							.post(
								`${process.env.REACT_APP_SERVER_URL}/route/details`,
								{
									route: routeIDs,
								},
								{
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							)
							.then((detailsRes) => {
								detailsRes.data.sort(
									(a, b) => new Date(b.created_at) - new Date(a.created_at)
								);
								setSavedRoute(detailsRes.data);
								setIsLoading(false);
							})
							.catch((err) => {
								setSavedRoute(false);
								setIsLoading(false);
							});
					} else {
						setSavedRoute(false);
					}
				})
				.catch((error) => {});
		}
	}, [currentPage, token]);

	const handlePageSwitch = (pageNumber) => {
		if (pageNumber === currentPage) {
			return;
		} else {
			setCurrentPage(pageNumber);
			setSavedRoute(null);
			setIsLoading(true);
		}
	};

	if (isLoading) {
		return;
	}

	return (
		<section className="saved-route">
			<div className="saved-route__top-wrapper">
				<h2 className="saved-route__title">📌 Saved Paths</h2>
				<div className="saved-route__list-page-wrapper saved-route__list-page-wrapper--top">
					{[...Array(totalPage)].map((nth, index) => {
						const thisPage = index + 1;
						return (
							<button
								className={`saved-route__list-page-button ${
									thisPage === currentPage
										? "saved-route__list-page-button--active"
										: ""
								}`}
								onClick={() => handlePageSwitch(thisPage)}
								key={thisPage}
							>
								<h4 className="saved-route__list-page-text">{thisPage}</h4>
							</button>
						);
					})}
				</div>
			</div>
			<div className="saved-route__list">
				{!savedRoute && (
					<p className="saved-route__no-route-text">
						No saved route in your account, go find out some path you like and
						click the love button to save it here.
					</p>
				)}

				{savedRoute.map((route) => {
					return (
						<RouteDetailsPanel
							selectedRoute={route.route_id}
							routes={savedRoute}
							mapRef={mapRef}
							signedin={signedin}
							isInProfile={true}
							key={route.route_id}
						/>
					);
				})}
			</div>
			<div className="saved-route__list-page-wrapper">
				{[...Array(totalPage)].map((nth, index) => {
					const thisPage = index + 1;
					return (
						<button
							className={`saved-route__list-page-button ${
								thisPage === currentPage
									? "saved-route__list-page-button--active"
									: ""
							}`}
							onClick={() => handlePageSwitch(thisPage)}
							key={thisPage}
						>
							<h4 className="saved-route__list-page-text">{thisPage}</h4>
						</button>
					);
				})}
			</div>
		</section>
	);
}

export default ProfileSavedRoute;

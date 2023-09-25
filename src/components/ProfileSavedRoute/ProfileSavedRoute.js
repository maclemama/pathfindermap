import "./ProfileSavedRoute.scss";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setModal } from "../../store/modal/modalSlice";
import { getSavedRouteIDs } from "../../scripts/routeUtils";
import { getSavedRoutesDetails } from "../../scripts/routeUtils";

import RouteDetailsPanel from "../RouteDetailsPanel/RouteDetailsPanel";
import RouteCard from "../RouteCard/RouteCard";

function ProfileSavedRoute({ mapRef, user }) {
	const dispatch = useDispatch();
	const [savedRoute, setSavedRoute] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(null);
	useEffect(() => {
		try {
			const getSavedRoutes = async () => {
				const routeIDsData = await getSavedRouteIDs(currentPage);
				const routeIDs = routeIDsData.data.map((route) => route.id);
				setTotalPage(routeIDsData.total_page);

				if (routeIDsData.total_page !== 0) {
					let routeDetails = await getSavedRoutesDetails(routeIDs);

					routeDetails.sort(
						(a, b) => new Date(b.created_at) - new Date(a.created_at)
					);

					setSavedRoute(routeDetails);
				} else {
					setSavedRoute(null);
				}
			};

			getSavedRoutes();
		} catch (error) {
			dispatch(
				setModal({
					title: "Error",
					message: error.response.data.message || error.message,
				})
			);
			setSavedRoute(null);
		} finally {
			setIsLoading(false);
		}
	}, [currentPage]);

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

				{savedRoute &&
					savedRoute.map((route) => {
						// console.log(route);
						return (
							// <RouteDetailsPanel
							// 	mapRef={mapRef}
							// 	routeDetails={route}
							// 	isInProfile={true}
							// 	key={route.route_id}
							// />
							<RouteCard routeDetails={route} key={route.route_id} />
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

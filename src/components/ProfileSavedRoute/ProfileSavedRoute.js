import "./ProfileSavedRoute.scss";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setModal } from "../../store/modal/modalSlice";
import { getSavedRouteIDs } from "../../scripts/routeUtils";
import { getSavedRoutesDetails } from "../../scripts/routeUtils";

import RouteCard from "../RouteCard/RouteCard";
import SortButton from "../SortButton/SortButton";
import FormInput from "../FormInput/FormInput";
import FormInputPrefix from "../FormInputPrefix/FormInputPrefix";

function ProfileSavedRoute() {
	const dispatch = useDispatch();
	const [savedRoute, setSavedRoute] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(null);
	const defaultSorting = {
		created_at: true,
		walking_distance: true,
		active_sort: "created_at",
	};
	const [sorting, setSorting] = useState(defaultSorting);
	const [searchValue, setSearchValue] = useState("");

	const getSavedRoutes = async (mode, currentPage, query) => {
		try {
			const routeIDsData = await getSavedRouteIDs(mode, currentPage, query);
			const routeIDs = routeIDsData.data.map((route) => route.id);
			setTotalPage(routeIDsData.total_page);

			if (routeIDsData.total_page !== 0 && routeIDs.length !== 0) {
				let routeDetails = await getSavedRoutesDetails(routeIDs);

				routeDetails.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				);

				setSavedRoute(routeDetails);
				setSorting(defaultSorting);
			} else {
				setSavedRoute(null);
			}
		} catch (error) {
			dispatch(
				setModal({
					title: "Error",
					message: error.response?.data?.message || error.message,
				})
			);
			setSavedRoute(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getSavedRoutes("page", currentPage);
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

	const handleSort = (name) => {
		let newSavedRoute = [...savedRoute];
		newSavedRoute.sort((a, b) => {
			let aValue = name === "created_at" ? new Date(a[name]) : a[name];
			let bValue = name === "created_at" ? new Date(b[name]) : b[name];
			if (sorting[name]) {
				return aValue - bValue;
			} else {
				return bValue - aValue;
			}
		});

		setSavedRoute(newSavedRoute);

		const newSorting = {
			...sorting,
			[name]: !sorting[name],
			active_sort: name,
		};
		setSorting(newSorting);
	};

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		if (e.key === "Enter") {
			getSavedRoutes("query", currentPage, searchValue);
		}
	};

	if (isLoading) {
		return;
	}

	return (
		<section className="saved-route">
			<div className="saved-route__controls">
				<div className="saved-route__controls-sort-wrapper">
					<FormInput
						inputType={"text"}
						inputPlaceHolder={"Search locations"}
						inputPreflixWidth={35}
						inputOnKeyDown={handleSearchSubmit}
						inputOnChange={handleSearchChange}
						inputValue={searchValue}
						prefixComponent={[<FormInputPrefix svgName={"search"} />]}
						cssClassName={"saved-route__search-input"}
					/>
					<div className="saved-route__controls-sort-button-wrapper">
						<SortButton
							iconName={sorting.created_at ? "arrow_up" : "arrow_down"}
							text={"Saved Time"}
							active={sorting.active_sort === "created_at"}
							onClickFunc={() => handleSort("created_at")}
						/>
						<SortButton
							iconName={sorting.walking_distance ? "arrow_up" : "arrow_down"}
							text={"Distance"}
							active={sorting.active_sort === "walking_distance"}
							onClickFunc={() => handleSort("walking_distance")}
						/>
					</div>
				</div>
				<div className="saved-route__controls-page-wrapper">
					{[...Array(totalPage)].map((nth, index) => {
						const thisPage = index + 1;
						return (
							<button
								className={`saved-route__controls-page-button ${
									thisPage === currentPage
										? "saved-route__controls-page-button--active"
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
						No saved route result, go find out some path you like and click the
						love button to save it here.
					</p>
				)}

				{savedRoute &&
					savedRoute.map((route) => {
						return <RouteCard routeDetails={route} key={route.route_id} />;
					})}
			</div>
		</section>
	);
}

export default ProfileSavedRoute;

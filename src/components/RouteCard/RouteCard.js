import "./RouteCard.scss";

function RouteCard({ routeDetails }) {
    console.log(routeDetails)
	return (
		<article className="route-card">
			<figure className="route-card__photo-wrapper"></figure>
			<div className="route-card__content">
				<div className="route-card__title-wrapper">
                    {
                        routeDetails.title || `Path start from ${routeDetails.address}`
                    }
                </div>
                <div className="route-card__info-wrapper">

                </div>
                <div className="route-card__path-wrapper"></div>
			</div>
		</article>
	);
}

export default RouteCard;

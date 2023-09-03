import RoutePlacesList from "../RoutePlacesList/RoutePlacesList";
import "./RouteDetailsPanel.scss";
import { useEffect, useState } from "react";

function RouteDetailsPanel({selectedRoute, routes, mapRef}) {
    const [selectedRouteDetails, setSelectedRouteDetails] = useState(null)

    useEffect(()=>{
        if(selectedRoute){
            console.log(`Selected route change to ${selectedRoute}`)
            const routeDetails = routes.filter(route => route.route_id === selectedRoute);
            console.log(routeDetails)
            if(routeDetails[0]){
                setSelectedRouteDetails(routeDetails[0]);
            }
        }
    },[selectedRoute])

    return ( 
        <section className="route-panel">
            <h2 className="route-panel__title">Places in the Path</h2>
            <RoutePlacesList selectedRouteDetails={selectedRouteDetails} mapRef={mapRef}/>
        </section>
    );
}

export default RouteDetailsPanel;
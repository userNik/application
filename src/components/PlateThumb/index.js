import React from "react";
import PlateWaiter from "../PlateWaiter";

import "./PlateThumb.scss";

const PlateThumb = ({ source }) => {
    if (!source) {
        return <PlateWaiter />;
    }

    const styles = {
        backgroundImage: `url(${source})`
    }

    return (
        <div className="plate-thumb" style={styles} />
    )
};

export default PlateThumb;

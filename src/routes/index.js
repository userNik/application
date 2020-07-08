import React from "react";
import loadable from "@loadable/component";
import {
    Switch,
    Route
} from "react-router-dom";

const IntroComponent = loadable(() => import("../components/views/Intro"));
const MoviePage = loadable(() => import("../components/views/MoviePage"));

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={IntroComponent} />
            <Route path="/:id" component={MoviePage} />
        </Switch>
    )
};

export default Routes;

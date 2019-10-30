import * as React from "react";
import {Redirect, Route, Switch} from "react-router";

import { SignInComponent } from "../containers";
import styles from "./no-auth-routes.module.scss";


const NoAuthRoutesComponent: React.FC = () => {
    return (
        <main className={styles.NoAuthRoutes}>
            <Switch>
                <Route path="/" component={SignInComponent} exact={true} />
                <Redirect path="*" to="/" />
            </Switch>
        </main>
    );
};

export default NoAuthRoutesComponent;

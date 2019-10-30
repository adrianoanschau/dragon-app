import * as React from "react";
import {Redirect, Route, Switch} from "react-router";

import {
    DragonsListComponent,
    DragonCreateComponent,
    DragonComponent
} from "../containers";
import Header, {ActionTypes} from "./header.component";
import styles from "./auth-routes.module.scss";

interface IProps {
    onAction: (string: ActionTypes) => void;
}

const AuthRoutesComponent: React.FC<IProps> = ({ onAction }) => {
    return (
        <React.Fragment>
            <Header onAction={onAction} />
            <main className={styles.AuthRoutes}>
                <Switch>
                    <Route path="/dragons" component={DragonsListComponent} />
                    <Route path="/dragon/create" component={DragonCreateComponent} />
                    <Route path="/dragon/:id" component={DragonComponent} />
                    <Redirect path="*" to="/dragons" />
                </Switch>
            </main>
        </React.Fragment>
    );
};

export default AuthRoutesComponent;

import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from "react-toasts";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas, faTrash} from "@fortawesome/free-solid-svg-icons";

import {
    AuthRoutesComponent,
    NoAuthRoutesComponent,
    ActionTypes
} from "./components";
import { AuthService } from "./services";

library.add(fas, faTrash);

interface IState {
    authenticated: boolean;
}

class App extends React.Component<RouteComponentProps, IState> {

    private service = new AuthService();

    constructor(props: Readonly<RouteComponentProps>) {
        super(props);
        this.state = {
            authenticated: false,
        };
        this.onAction = this.onAction.bind(this);
    }

    componentDidMount(): void {
        this.service.load();
        this.service.authenticated$
            .subscribe(authenticated => {
                this.setState({ authenticated });
            });
    }

    private onAction(action: ActionTypes): void {
        const { history } = this.props;
        switch (action) {
            case ActionTypes.createDragon:
                history.push('/dragon/create');
                break;
            case ActionTypes.signOut:
                this.service.signOut();
                break;
        }
    }

    render(): React.ReactElement<any> {
        const { authenticated } = this.state;
        return (
            <div className="App">
                {authenticated && <AuthRoutesComponent onAction={this.onAction} />}
                {!authenticated && <NoAuthRoutesComponent />}
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
            </div>
        );
    }
}

export default withRouter(App);

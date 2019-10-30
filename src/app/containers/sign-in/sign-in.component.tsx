import * as React from "react";
import {ChangeEvent} from "react";

import { ButtonComponent }from "../../shared/components";
import { AuthService } from "../../services";
import styles from "./sign-in.module.scss";

type AuthForm = {
    username: string;
    password: string;
};

interface IProps {}

interface IState {
    form: AuthForm;
}

export default class SignInComponent extends React.Component<IProps,IState> {

    private service = new AuthService();

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            form: {
                username: "",
                password: ""
            }
        };
        this.signIn = this.signIn.bind(this);
    }

    private onChange(field: 'username' | 'password') {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const { form } = this.state;
            form[field] = event.target.value;
            this.setState({ form });
        }
    }

    private signIn() {
        const { form } = this.state;
        this.service.signIn(form.username, form.password);
    }

    render(): React.ReactElement<any> {
        const { form } = this.state;
        return (
            <div className={styles.SignIn}>
                <div>
                    <p className={styles.title}>
                        Catálogo de Dragões
                    </p>
                    <p className={styles.subtitle}>Username: admin, Password: admin</p>
                    <input type="text" placeholder="Username" value={form.username} onChange={this.onChange('username')} />
                    <input type="password" placeholder="Password" value={form.password} onChange={this.onChange('password')} />
                    <ButtonComponent color="primary" onClick={this.signIn}>Entrar</ButtonComponent>
                </div>
            </div>
        )
    }
}

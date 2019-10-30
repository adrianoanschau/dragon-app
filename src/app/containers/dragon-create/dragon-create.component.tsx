import * as React from "react";
import {Link} from "react-router-dom";

import {Dragon, IDragonForm} from "../../models/dragon.model";
import {DragonFormComponent} from "../../components";
import { ButtonComponent } from "../../shared/components";
import { DragonsService } from "../../services";
import styles from "./dragon-create.module.scss";
import avatar from "../../../assets/img/dragon.png";

interface IProps {}

interface IState {
    form: IDragonForm;
}

export default class DragonCreateComponent extends React.Component<IProps, IState> {

    private service = new DragonsService();

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            form: {
                name: "",
                type: ""
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(value: IDragonForm) {
        this.setState({ form: { ...value } });
    }

    onSave() {
        const { form } = this.state;
        const dragon = new Dragon({ ...form });
        this.service.create(dragon);
    }

    render(): React.ReactElement<any> {
        return (
            <div className={styles.DragonCreate}>
                <figure className={styles.avatar}>
                    <img src={avatar} alt="Dragon Avatar" />
                </figure>
                <div className={styles.form}>
                    <DragonFormComponent dragon={new Dragon()} onValueChanges={this.onChange} />
                </div>
                <ButtonComponent color="primary" onClick={this.onSave}>
                    Salvar
                </ButtonComponent>
                <Link to={'/dragons'} className={styles.link}>
                    Voltar para a lista
                </Link>
            </div>
        )
    }
}

import * as React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {Dragon} from "../../models/dragon.model";
import { DragonsService } from "../../services";
import styles from "./dragon.module.scss";
import avatar from "../../../assets/img/dragon.png";

function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

interface IProps {
    match: { params: { id: string }};
}

interface IState {
    dragon: Dragon | null;
}

export default class DragonComponent extends React.Component<IProps, IState> {

    private service = new DragonsService();

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            dragon: null
        };
    }

    componentDidMount(): void {
        const { params } = this.props.match;
        this.service.getDragon(params.id);
        this.service.selected$
            .subscribe(dragon => this.setState({ dragon }));
    }

    componentWillUnmount(): void {
        this.service.selected$.unsubscribe();
    }

    render(): React.ReactElement<any> {
        const { dragon } = this.state;
        if (dragon === null) {
            return <div className={styles.loading}>
                <FontAwesomeIcon icon="spinner" spin />
            </div>;
        }
        return (
            <div className={styles.Dragon}>
                <figure className={styles.avatar}>
                    <img src={avatar} alt="Dragon Avatar" />
                </figure>
                <p>Nome: <span>{ dragon.name }</span></p>
                <p>Tipo: <span>{ dragon.type }</span></p>
                <p>Criado em: <span>{ formatDate(dragon.createdAt) }</span></p>
                <Link to={'/dragons'} className={styles.link}>
                    Voltar para a lista
                </Link>
            </div>
        );
    }
}

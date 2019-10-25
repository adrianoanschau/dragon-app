import React from 'react';
import DragonsService from '../../services/dragons.service';
import styles from './dragons-list.module.scss';

type IProps = {};

type IState = {
    dragons: Dragon[];
    inEdit: string | null;
}

type Dragon = {
    id: string;
    name: string;
}

export default class DragonsListComponent extends React.Component<IProps, IState> {

    private service = new DragonsService();

    constructor(props: IProps, context: any) {
        super(props, context);
        this.state = {
            dragons: [],
            inEdit: null,
        };
    }

    componentDidMount(): void {
        this.service.getDragons()
            .subscribe((dragons: Dragon[]) => {
                this.setState({ dragons });
            });
    }

    editDragon(id: string) {
        this.setState(({ inEdit }) => ({
            inEdit: inEdit !== id ? id : null
        }));
    }

    listDragons() {
        const { dragons, inEdit } = this.state;
        return dragons.map(dragon =>
            <li key={dragon.id}
                className={inEdit === dragon.id ? styles.DragonEdit : ''}
                onClick={() => this.editDragon(dragon.id)}>
                {dragon.name}
            </li>);
    }

    render(): React.ReactElement<any> {
        return (
            <div className={styles.DragonsList}>
                <ul>{this.listDragons()}</ul>
            </div>
        );
    }
}

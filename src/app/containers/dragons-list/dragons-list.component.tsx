import React from 'react';

import {Dragon} from "../../models/dragon.model";
import {DragonItemComponent} from "../../components";
import { DragonsService } from '../../services';
import styles from './dragons-list.module.scss';

type IProps = {};

type IState = {
    dragons: Dragon[];
    inEdit: string | null;
}

export default class DragonsListComponent extends React.Component<IProps, IState> {

    private service = new DragonsService();

    constructor(props: Readonly<IProps>, context: any) {
        super(props, context);
        this.state = {
            dragons: [],
            inEdit: null,
        };
    }

    componentDidMount(): void {
        this.service.getDragons();
        this.service.list$
            .subscribe((dragons: Dragon[]) => {
                this.setState({ dragons });
            });
    }

    componentWillUnmount(): void {
        this.service.list$.unsubscribe();
    }

    private onEdit(id: string | null) {
        return () => this.setState({
            inEdit: id
        });
    }

    private onDelete(id: string | null) {
        return () => {
            if (id) {
                this.service.delete(id);
            }
        }
    }

    private onSave(id: string | null) {
        return (data: Dragon) => {
            if (id) {
                this.service.update(id, data);
            }
        }
    }

    render(): React.ReactElement<any> {
        const { dragons, inEdit } = this.state;
        return (
            <div className={styles.DragonsList}>
                <ul>
                    {dragons.map(dragon =>
                        <DragonItemComponent key={`${dragon.id}${dragon.name}${dragon.type}`}
                                             route={`/dragon/${dragon.id}`}
                                             dragon={dragon}
                                             edit={dragon.id === inEdit}
                                             onEdit={this.onEdit(dragon.id)}
                                             onCancelEdit={this.onEdit(null)}
                                             onDelete={this.onDelete(dragon.id)}
                                             onSave={this.onSave(dragon.id)}
                                        />
                    )}
                </ul>
            </div>
        );
    }
}

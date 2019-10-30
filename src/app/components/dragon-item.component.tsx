import * as React from "react";
import cn from "classnames";
import {Link} from "react-router-dom";
import CSSTransitionGroup from "react-addons-css-transition-group";

import {Dragon, IDragonForm} from "../models/dragon.model";
import DragonFormComponent  from "./dragon-form.component";
import { ButtonComponent } from "../shared/components";
import styles from './dragon-item.module.scss';

interface IProps {
    dragon: Dragon;
    route?: string;
    edit?: boolean;
    onSelect?: () => void;
    onEdit?: () => void;
    onCancelEdit?: () => void;
    onSave?: (data: Dragon) => void;
    onDelete?: () => void;
}

interface IState {
    form: IDragonForm;
    hasChanges: boolean;
}

export default class DragonItemComponent extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            form: {
                name: props.dragon.name || "",
                type: props.dragon.type || "",
            },
            hasChanges: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    private onChange(value: IDragonForm) {
        this.setState({
            form: { ...value },
            hasChanges: true,
        });
    }

    private save() {
        const { dragon, onSave } = this.props;
        const { form } = this.state;
        if (onSave) {
            const model = new Dragon({ ...form, id: (dragon && dragon.id) ? dragon.id : null });
            onSave(model);
        }
        this.setState({ hasChanges: false });
    }

    private delete() {
        const { onDelete } = this.props;
        if (onDelete) {
            onDelete();
        }
    }

    private form() {
        const { dragon } = this.props;
        const { hasChanges } = this.state;
        return (
            <div className={styles.form}>
                <DragonFormComponent dragon={dragon} onValueChanges={this.onChange} />
                <div>
                    {hasChanges && (
                        <ButtonComponent
                            icon={{ icon: 'save', color: 'darkblue' }}
                            title="Save changes"
                            onClick={() => this.save()}/>
                    )}
                    {!hasChanges && (
                        <ButtonComponent
                            icon={{ icon: 'trash', color: 'red' }}
                            title="Delete Dragon"
                            onClick={() => this.delete()}/>
                    )}
                </div>
            </div>
        );
    }

    private renderAction() {
        const { edit, onEdit, onCancelEdit } = this.props;
        if (!edit) {
            return (
                <ButtonComponent
                    icon={{ icon: 'pen' }}
                    title="Edit Dragon"
                    onClick={onEdit}/>
            )
        }
        return (
            <ButtonComponent
                icon={{ icon: 'times' }}
                title="Cancel edit"
                onClick={onCancelEdit}/>
        );
    }

    render(): React.ReactElement<any> {
        const { dragon, edit, route } = this.props;
        return (
            <CSSTransitionGroup
                className={cn(styles.Dragon, edit && styles.edit)}
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={styles.show}>
                    {route && <Link to={route} title="View Dragon">{dragon && dragon.name}</Link>}
                    {!route && <span>{dragon && dragon.name}</span>}
                    <div>{this.renderAction()}</div>
                </div>
                {edit && this.form()}
            </CSSTransitionGroup>
        )
    }
}

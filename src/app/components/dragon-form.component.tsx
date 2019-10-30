import * as React from "react";
import {ChangeEvent} from "react";

import {Dragon, IDragonForm} from "../models/dragon.model";
import styles from "./dragon-form.module.scss";

interface IProps {
    dragon: Dragon;
    onValueChanges?: (value: IDragonForm) => void;
    onSave?: (data: Dragon) => void;
}

interface IState {
    form: IDragonForm;
}

export default class DragonFormComponent extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            form: {
                name: props.dragon.name || "",
                type: props.dragon.type || "",
            },
        };
    }

    private onChange(field: string) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const { form } = this.state;
            const newForm = { ...form, [field]: event.target.value };
            this.setState(
                { form: newForm },
                () => {
                const { onValueChanges } = this.props;
                if (onValueChanges) {
                    onValueChanges(newForm);
                }
            });
        }
    }

    render(): React.ReactElement<any> {
        const { form } = this.state;
        return (
            <div className={styles.DragonForm}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name"
                           onChange={this.onChange('name')}
                           value={form.name} />
                </div>
                <div>
                    <label htmlFor="type">Tipo:</label>
                    <input type="text" id="type"
                           onChange={this.onChange('type')}
                           value={form.type} />
                </div>
            </div>
        )
    }
}

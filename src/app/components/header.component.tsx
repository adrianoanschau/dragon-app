import * as React from "react";
import { ButtonComponent } from "../shared/components";
import styles from "./header.module.scss";

export enum ActionTypes {
    signOut, createDragon,
}

interface IProps {
    onAction: (string: ActionTypes) => void;
}

const Header: React.FC<IProps> = ({ onAction }) => {
    return (
        <header className={styles.Header}>
            <span>Catálogo de Dragões</span>
            <div>
                <ButtonComponent icon={{ icon: 'plus', color: 'white' }}
                        title="Create a Dragon"
                        onClick={() => onAction(ActionTypes.createDragon)}
                />
            </div>
            <div>
                <ButtonComponent icon={{ icon: 'sign-out-alt', color: 'white' }}
                        title="Sign Out"
                        onClick={() => onAction(ActionTypes.signOut)}
                />
            </div>
        </header>
    );
};

export default Header;

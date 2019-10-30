import * as React from "react";
import cn from "classnames";

import Icon, {IconProps} from "./icon.component";
import styles from "./button.module.scss";

interface IProps {
    icon?: IconProps;
    title?: string;
    onClick?: () => void;
    color?: 'primary';
}

const Button: React.FC<IProps> = ({ icon, title, onClick = () => {}, children, color }) => (
    <button type="button"
            className={cn(
                styles.Button,
                color && styles[color],
            )}
            title={title}
            onClick={onClick}
    >
        {icon && <Icon { ...icon } />}
        {children}
    </button>
);

export default Button;

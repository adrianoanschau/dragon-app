import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
    icon: IconProp;
    color?: string;
}

const Icon: React.FC<IconProps> = ({ icon, color = 'black' }) => <FontAwesomeIcon icon={icon} style={{ color }} />;

export default Icon;

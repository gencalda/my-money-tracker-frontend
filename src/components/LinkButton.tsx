import { Link } from 'react-router-dom';
import { getButtonClass } from './Button';

interface Props {
  label?: string;
  url: string;
  isBlock?: boolean;
  isSecondary?: boolean;
  className?: string;
}

const LinkButton: React.FC<Props> = ({ url, label, children }) => (
  <Link
    to={url}
    className={`flex justify-center items-center ${getButtonClass({
      isBlock: true,
    })}`}
  >
    {label || children}
  </Link>
);

export default LinkButton;

import { AiOutlineSafety, AiTwotoneTool } from 'react-icons/ai';

const IconsAI: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'AiOutlineSafety':
      return <AiOutlineSafety />;
    case 'AiTwotoneTool':
      return <AiTwotoneTool />;
    default:
      return null;
  }
};

export default IconsAI;

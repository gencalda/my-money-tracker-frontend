import { CgSpinner } from 'react-icons/cg';

const LoadingSpinner: React.FC = () => (
  <div className="mt-12 w-full h-[80%] flex justify-center items-center text-primary text-4xl">
    <div className="animate-spin">
      <CgSpinner />
    </div>
  </div>
);

export default LoadingSpinner;

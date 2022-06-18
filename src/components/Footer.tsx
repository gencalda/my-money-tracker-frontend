import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';
import { setFooterHeight } from 'reducers/uiSlice';

interface Props {
  isFixed?: boolean;
  className?: string;
}

const Footer: React.FC<Props> = ({ children, className = '' }) => {
  const { height, ref } = useResizeDetector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFooterHeight(height));
  }, [height, dispatch]);

  return (
    <div
      ref={ref}
      className={`${className} z-[2] fixed bg-app-bg bottom-0 w-full md:w-[768px] border-t border flex justify-evenly`}
    >
      {children}
    </div>
  );
};

export default Footer;

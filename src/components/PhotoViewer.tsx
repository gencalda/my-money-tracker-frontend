import ImageViewer from 'react-simple-image-viewer';

interface Props {
  photosUrl: string[];
  currentPhotoIndex: number;
  onPhotoViewerClose: () => void;
}

const PhotoViewer: React.FC<Props> = ({
  photosUrl,
  currentPhotoIndex,
  onPhotoViewerClose,
}) => {
  const closeImageViewer = () => {
    onPhotoViewerClose?.();
  };

  return (
    <ImageViewer
      src={photosUrl || []}
      currentIndex={currentPhotoIndex}
      onClose={closeImageViewer}
      disableScroll={false}
      backgroundStyle={{
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: '20',
        height: '100vh',
      }}
      closeOnClickOutside
    />
  );
};

export default PhotoViewer;

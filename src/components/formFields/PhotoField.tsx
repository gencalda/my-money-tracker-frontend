import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { MdAddPhotoAlternate, MdClose } from 'react-icons/md';
import { ToastContent } from 'react-toastify';
import { v4 as uuidV4 } from 'uuid';
import CustomButton from 'components/CustomButton';
import PhotoViewer from 'components/PhotoViewer';
import { displayFailToast } from 'shared/helpers/toast';
import {
  AttachmentType,
  IAttachmentToUpload,
  IViewAttachment,
} from 'shared/types/commonTypes';

interface Props {
  id?: string;
  name: string;
  onChange: (photosToUpload: IAttachmentToUpload[]) => void;
  onRemove: (photoToRemove: IAttachmentToUpload | IViewAttachment) => void;
  photosViewData?: (IViewAttachment | IAttachmentToUpload)[];
  attachmentType: AttachmentType;
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const IMAGE_FILE_TYPES = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

interface IFilenamesErrorDisplayProps {
  label: string;
  invalidFilenames: string[];
}

const FilenamesErrorDisplay: React.FC<IFilenamesErrorDisplayProps> = ({
  label,
  invalidFilenames,
}) => (
  <>
    <div>{label}</div>
    <ul>
      {invalidFilenames?.map((file) => (
        <li className="flex" key={file}>
          <div className="flex items-center text-xl">
            <BsDot />
          </div>
          <div>{file}</div>
        </li>
      ))}
    </ul>
  </>
);

const PhotoField: React.FC<Props> = ({
  id,
  onChange,
  onRemove,
  photosViewData = [],
  attachmentType,
}) => {
  const [fieldId, setFieldId] = useState(uuidV4());
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<ToastContent>();

  const MAX_PHOTOS = 3;
  const MAX_PHOTOS_ERROR_MESSAGE = `Can only have up to ${MAX_PHOTOS} photos.`;

  useEffect(() => {
    if (id) {
      setFieldId(id);
    }
  }, [id]);

  useEffect(() => {
    if (errorMessage) {
      displayFailToast(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage]);

  const getValidFileTypePhotos = (
    newPhotos: IAttachmentToUpload[] = []
  ): IAttachmentToUpload[] => {
    const invalidFiles: IAttachmentToUpload[] = [];

    const validPhotos = newPhotos?.filter?.((newPhoto) => {
      const { fileType } = newPhoto;
      const isValid = IMAGE_FILE_TYPES.includes(fileType);

      if (!isValid) {
        invalidFiles.push(newPhoto);
      }
      return isValid;
    });

    if (invalidFiles?.length > 0) {
      setErrorMessage(
        <FilenamesErrorDisplay
          label="The ff. files have invalid file type:"
          invalidFilenames={invalidFiles?.map(({ fileName }) => fileName)}
        />
      );
    }

    return validPhotos;
  };

  const getValidFileSizePhotos = (
    newPhotos: IAttachmentToUpload[] = []
  ): IAttachmentToUpload[] => {
    const invalidFiles: IAttachmentToUpload[] = [];

    const validPhotos = newPhotos?.filter?.((newPhoto) => {
      const { fileSize } = newPhoto;
      const oneMB = 1048576;
      const threeMB = oneMB * 3;
      const isValid = fileSize < threeMB;

      if (!isValid) {
        invalidFiles.push(newPhoto);
      }
      return isValid;
    });

    if (invalidFiles?.length > 0) {
      setErrorMessage(
        <FilenamesErrorDisplay
          label="The ff. files has more than 3MB file size:"
          invalidFilenames={invalidFiles?.map(({ fileName }) => fileName)}
        />
      );
    }

    return validPhotos;
  };

  const getPhotoListValue = (newPhotos: IAttachmentToUpload[] = []) => {
    const newValidFileTypePhotos = getValidFileTypePhotos(newPhotos);
    const newValidFileSizePhotos = getValidFileSizePhotos(
      newValidFileTypePhotos
    );

    if (newValidFileSizePhotos?.length < 1) {
      return [];
    }

    const combinedList = [...photosViewData, ...newValidFileSizePhotos];

    if (combinedList?.length > MAX_PHOTOS) {
      setErrorMessage(MAX_PHOTOS_ERROR_MESSAGE);
    }

    return (
      newValidFileSizePhotos?.slice(
        0,
        MAX_PHOTOS - (photosViewData?.length || 0)
      ) || []
    );
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (photosViewData?.length >= MAX_PHOTOS) {
      setErrorMessage(MAX_PHOTOS_ERROR_MESSAGE);
      return;
    }

    const { target: { files = [] } = {} } = event || {};
    if (files && files?.length > 0) {
      const photoArray: IAttachmentToUpload[] = [];
      /* eslint-disable no-restricted-syntax, no-plusplus */
      for (let i = 0; i < files?.length; i++) {
        photoArray.push({
          file: files[i],
          fileName: files[i].name,
          fileSize: files[i].size,
          fileType: files[i].type,
          url: URL.createObjectURL(files[i]),
          uuid: uuidV4(),
          attachmentType,
          toBeUploaded: true,
        });
      }
      /* eslint-enable no-restricted-syntax, no-plusplus */

      onChange?.(getPhotoListValue(photoArray as IAttachmentToUpload[]));
    }
  };

  const openPhotoViewer = useCallback((index) => {
    setCurrentPhotoIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closePhotoViewer = () => {
    setCurrentPhotoIndex(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="flex flex-wrap mb-4 gap-4">
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      {photosViewData?.map?.((photo, index) => (
        <div key={photo?.url} className="h-full w-full max-w-[31%] pt-4">
          <div className="relative max-h-[300px]">
            <img
              className="cursor-pointer h-full w-full max-h-[300px] mr-3 mb-3"
              alt={`transaction img-${index + 1}`}
              src={photo?.url}
              onClick={() => openPhotoViewer(index)}
            />
            <CustomButton
              className="text-md p-0.5 rounded-full border-4 border-app-bg border-solid bg-secondary text-color-label absolute top-[-12px] right-[-10px]"
              onClickHandler={() => onRemove?.(photo)}
            >
              <MdClose />
            </CustomButton>
          </div>
        </div>
      ))}
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}

      {photosViewData?.length < MAX_PHOTOS && (
        <div className="w-[31%] pt-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={fieldId} className="w-full cursor-pointer">
            <div className="text-color-label h-[8rem] w-full md:h-[12rem] border border-primary border-dashed mb-2 flex items-center justify-center">
              <div className="flex items-center">
                <div className="text-2xl mr-0.5">
                  <MdAddPhotoAlternate />
                </div>
                <div className="mt-0.5">Add Photo/s</div>
              </div>
            </div>
          </label>
          <input
            className="hidden"
            type="file"
            id={fieldId}
            multiple
            accept="image/*"
            onChange={onChangeHandler}
          />
        </div>
      )}

      {isViewerOpen && (
        <PhotoViewer
          photosUrl={photosViewData?.map(({ url }) => url) || []}
          currentPhotoIndex={currentPhotoIndex}
          onPhotoViewerClose={closePhotoViewer}
        />
      )}
    </div>
  );
};

export default PhotoField;

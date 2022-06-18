import { useCallback, useEffect, useState } from 'react';
import {
  IAttachmentToUpload,
  IBaseAttachment,
  IViewAttachment,
} from 'shared/types/commonTypes';

const usePhotoField = ({
  existingPhotos,
}: {
  existingPhotos: IViewAttachment[];
}) => {
  const [photosToUpload, setPhotosToUpload] = useState<IAttachmentToUpload[]>(
    []
  );
  const [photosToDelete, setPhotosToDelete] = useState<IBaseAttachment[]>([]);
  const [photoList, setPhotoList] = useState<
    (IAttachmentToUpload | IViewAttachment)[]
  >([]);

  const updatedPhotoList = useCallback(
    ({
      updatedPhotosToUpload,
      updatedPhotosToDelete,
      updatedExistingPhotos,
    }: {
      updatedPhotosToUpload: IAttachmentToUpload[];
      updatedPhotosToDelete: IBaseAttachment[];
      updatedExistingPhotos: IViewAttachment[];
    }) => {
      const updatedPhotos = [
        ...updatedExistingPhotos,
        ...updatedPhotosToUpload,
      ];

      const filteredUpdatedPhotos = updatedPhotos?.filter?.((photo) => {
        const isToBeDeleted =
          updatedPhotosToDelete?.find?.(
            (photoToDelete) =>
              photoToDelete.fileName === photo.fileName &&
              photoToDelete.uuid === photo.uuid
          ) !== undefined;

        return !isToBeDeleted;
      });

      setPhotoList(filteredUpdatedPhotos);
    },
    []
  );

  useEffect(() => {
    updatedPhotoList({
      updatedPhotosToUpload: photosToUpload,
      updatedExistingPhotos: existingPhotos,
      updatedPhotosToDelete: photosToDelete,
    });
  }, [existingPhotos, photosToUpload, photosToDelete, updatedPhotoList]);

  const onPhotosChangeHandler = useCallback(
    (newPhotoList: IAttachmentToUpload[]) => {
      setPhotosToUpload((currentPhotosToUploadList) => {
        const filteredNewPhotoList = newPhotoList?.filter?.(
          (newPhoto) =>
            !currentPhotosToUploadList?.find?.(
              (currentPhoto) =>
                currentPhoto?.fileName === newPhoto?.fileName &&
                currentPhoto?.fileSize === newPhoto?.fileSize &&
                currentPhoto?.fileType &&
                newPhoto?.fileType
            )
        );

        return [...currentPhotosToUploadList, ...filteredNewPhotoList];
      });
    },
    []
  );

  const onPhotoRemoveHandler = useCallback(
    (photoToRemove: IAttachmentToUpload | IViewAttachment) => {
      setPhotoList((currentPhotoList) =>
        currentPhotoList?.filter?.(
          (currentPhoto) =>
            currentPhoto.fileName !== photoToRemove.fileName &&
            currentPhoto.uuid !== photoToRemove.uuid
        )
      );

      if (photoToRemove?.toBeUploaded) {
        setPhotosToUpload((currentPhotoList) => {
          const filteredUploadPhotos = currentPhotoList?.filter?.(
            (currentPhoto) =>
              currentPhoto.fileName !== photoToRemove.fileName &&
              currentPhoto.uuid !== photoToRemove.uuid
          );

          return [...filteredUploadPhotos];
        });

        return;
      }

      setPhotosToDelete((currentPhotosToDelete) => {
        const existingPhotoToDelete = currentPhotosToDelete?.find?.(
          (currentPhoto) =>
            currentPhoto.fileName === photoToRemove.fileName &&
            currentPhoto.uuid === photoToRemove.uuid
        );

        return existingPhotoToDelete
          ? [...currentPhotosToDelete]
          : [
              ...currentPhotosToDelete,
              {
                uuid: photoToRemove.uuid,
                fileName: photoToRemove.fileName,
                attachmentType: photoToRemove.attachmentType,
              },
            ];
      });
    },
    []
  );

  return {
    photoList,
    photosToUpload,
    setPhotosToUpload,
    onPhotosChangeHandler,
    photosToDelete,
    onPhotoRemoveHandler,
  };
};

export default usePhotoField;

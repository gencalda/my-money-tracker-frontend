import { Storage } from 'aws-amplify';
import {
  AttachmentType,
  IAttachmentToUpload,
  IBaseAttachment,
  IViewAttachment,
  S3Folder,
} from 'shared/types/commonTypes';
import { logError } from './common';

export const generateObjectKey = (uuid: string, fileName: string) =>
  `${uuid || ''}_${fileName?.trim?.() || ''}`;

export const getFolderNameOnAttachmentType = (attachmentType: string) => {
  switch (attachmentType) {
    case AttachmentType.Transaction:
      return S3Folder.Transaction;
    default:
      return S3Folder.General;
  }
};

const getDeleteAttachmentRequests = (
  attachmentsToDelete: IBaseAttachment[]
): Promise<any>[] => {
  if (!attachmentsToDelete) {
    return [];
  }

  return attachmentsToDelete?.map?.(async (attachment) => {
    try {
      const objectKey = `${attachment.uuid}_${attachment.fileName}`;
      const folderName = getFolderNameOnAttachmentType(
        attachment.attachmentType
      );

      await Storage.remove(`${folderName}${objectKey}`);
    } catch (error) {
      logError(error);
    }
  });
};

const uploadAttachment = async ({
  completeObjectKey,
  file,
  fileName,
}: {
  completeObjectKey: string;
  file: File;
  fileName: string;
}) => {
  try {
    const result = await Storage.put(completeObjectKey, file);
    return { success: true, fileName, result };
  } catch (error) {
    logError(error);
    return { success: false, fileName };
  }
};

export const getUploadAttachmentRequests = (
  attachmentsToUpload: IAttachmentToUpload[] | undefined
): Promise<{ success: boolean; fileName: string; result?: any }>[] => {
  if (!attachmentsToUpload) {
    return [];
  }

  return attachmentsToUpload?.map?.(
    ({ file, uuid, attachmentType }) =>
      new Promise((resolve) => {
        const objectKey = `${uuid}_${file.name?.trim?.()}`;
        const folderName = getFolderNameOnAttachmentType(attachmentType);

        uploadAttachment({
          completeObjectKey: `${folderName}${objectKey}`,
          file,
          fileName: file.name,
        })
          .then((result) => resolve(result))
          .catch((error) => logError(error));
      })
  );
};

export const uploadAttachments = (
  attachmentsToUpload: IAttachmentToUpload[] | undefined
): Promise<{ data: { success: boolean; failedFiles?: string[] } }> =>
  new Promise((resolve) => {
    const requests = getUploadAttachmentRequests(attachmentsToUpload);

    Promise.all(requests)
      .then((results) => {
        const failedFiles: string[] = [];

        results?.forEach?.(({ success, fileName }) => {
          if (!success) {
            failedFiles.push(fileName);
          }
        });

        resolve({
          data: {
            success: true,
            failedFiles,
          },
        });
      })
      .catch((error) => {
        logError(error);
        resolve({
          data: {
            success: false,
          },
        });
      });
  });

export const deleteAttachments = (attachmentsToDelete: IBaseAttachment[]) =>
  new Promise((resolve) => {
    const requests = getDeleteAttachmentRequests(attachmentsToDelete);

    Promise.all(requests)
      .then(() => {
        resolve('Delete attachment success');
      })
      .catch((error) => {
        resolve('Delete attachment failed');
        logError(error);
      });
  });

export const getAttachment = ({
  uuid = '',
  fileName = '',
  attachmentType,
}: {
  uuid: string;
  fileName: string;
  attachmentType: AttachmentType;
}): Promise<IViewAttachment> =>
  new Promise((resolve, reject) => {
    if (!uuid || !fileName || !attachmentType) {
      const error = new Error('Missing uuid or fileName or attachmentType');
      logError(error);
      reject(error);

      return;
    }

    Storage.get(
      `${getFolderNameOnAttachmentType(attachmentType)}${generateObjectKey(
        uuid,
        fileName
      )}`
    )
      .then((result) => {
        resolve({
          url: result,
          uuid,
          fileName,
          attachmentType,
          toBeUploaded: false,
        });
      })
      .catch((error) => {
        logError(error);
        reject(error);
      });
  });

import { apiClient } from 'config/api';
import { ApiRoutes } from 'shared/constants/apiRoutes';
import { AttachmentType } from 'shared/types/commonTypes';

export const uploadAttachments = (
  attachmentType: AttachmentType,
  formData: FormData
) => apiClient.post(`${ApiRoutes.Attachments}/${attachmentType}`, formData);

export const getAttachment = (
  fileName: string,
  attachmentType: AttachmentType
) => {
  const fileNameQueryStringValue = encodeURIComponent(fileName || '');

  return apiClient(
    `${ApiRoutes.Attachments}/${attachmentType}?fileName=${fileNameQueryStringValue}`
  );
};

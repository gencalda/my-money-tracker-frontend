import { apiClient } from 'config/api';
import { AttachmentType } from 'shared/types/commonTypes';

export const uploadAttachments = (
  attachmentType: AttachmentType,
  formData: FormData
) => apiClient.post(`/api/attachments/${attachmentType}`, formData);

export const getAttachment = (
  fileName: string,
  attachmentType: AttachmentType
) => {
  const fileNameQueryStringValue = encodeURIComponent(fileName || '');

  return apiClient(
    `/api/attachments/${attachmentType}?fileName=${fileNameQueryStringValue}`
  );
};

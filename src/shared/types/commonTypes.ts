export enum IButtonType {
  Button = 'Button',
  Submit = 'Submit',
}

export enum OperationType {
  Update = 'Update',
  Create = 'Create',
  Delete = 'Delete',
  View = 'View',
}

export interface IResult {
  success: boolean;
  message: string;
  result?: any;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  result?: T;
}

export interface IFormFieldConfig<T> {
  label: string;
  isRequired?: boolean;
  value: T;
  fieldName: string;
}

export type TypeFormErrorSetter = (
  fieldName: string,
  isValid: boolean,
  errorMessage: string
) => void;

export interface IOptions {
  label: string;
  value: string;
}

export interface IAwsCognito {
  USER_POOL_ID: string;
  CLIENT_ID: string;
  IDENTITY_POOL_ID: string;
}
export enum S3Folder {
  Transaction = 'Transaction/',
  General = 'General/',
}
export interface IS3 {
  BUCKET: string;
  FOLDERS: Record<string, string>;
}

export interface IEnvironmentConfig {
  AWS_REGION: string;
  API_BASE_URL: string;
  AWS_COGNITO: IAwsCognito;
  S3: IS3;
}

export enum AttachmentType {
  Transaction = 'transaction',
  General = 'general',
}

export interface IBaseAttachment {
  uuid: string;
  fileName: string;
  attachmentType: AttachmentType;
}

export interface IViewAttachment extends IBaseAttachment {
  url: string;
  toBeUploaded: boolean;
}
export interface IAttachmentDetails extends IBaseAttachment {
  fileSize: number;
  fileType: string;
}

export interface IAttachmentToUpload
  extends IAttachmentDetails,
    IViewAttachment {
  file: File;
}

export interface IAttachment {
  uuid: string;
  name: string;
  size: number;
  type: string;
}

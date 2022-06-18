import { IEnvironmentConfig, S3Folder } from 'shared/types/commonTypes';

export const DEV_VARIABLES: IEnvironmentConfig = {
  API_BASE_URL: 'https://ql6tre5y9e.execute-api.us-east-1.amazonaws.com',
  AWS_COGNITO: {
    USER_POOL_ID: 'us-east-1_LujdvhGDn',
    CLIENT_ID: '7ls9mo2hcahftb8ssr6dtre9kv',
    IDENTITY_POOL_ID: 'us-east-1:af554ac1-b295-4f87-a5e8-166089b6f7c4',
  },
  AWS_REGION: 'us-east-1',
  S3: {
    BUCKET: `dev-my-money-tracker-f3ace843-2227-420b-9a28-0f2e5458087f`,
    FOLDERS: {
      TRANSACTION: S3Folder.Transaction,
      GENERAL: S3Folder.General,
    },
  },
};

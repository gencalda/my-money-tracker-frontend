import { ENV, ENV_VARIABLES } from './environments/environmentHelper';

export const AMPLIFY_CONFIG = {
  Auth: {
    region: ENV_VARIABLES?.[ENV]?.AWS_REGION,
    userPoolId: ENV_VARIABLES?.[ENV]?.AWS_COGNITO.USER_POOL_ID,
    userPoolWebClientId: ENV_VARIABLES?.[ENV]?.AWS_COGNITO.CLIENT_ID,
    identityPoolId: ENV_VARIABLES?.[ENV]?.AWS_COGNITO.IDENTITY_POOL_ID,
  },
  Storage: {
    AWSS3: {
      bucket: ENV_VARIABLES?.[ENV]?.S3.BUCKET,
      region: ENV_VARIABLES?.[ENV]?.AWS_REGION,
    },
  },
};

export const AMPLIFY_STORAGE = {
  FILE_ACCESS_LEVEL: { level: 'private' },
};

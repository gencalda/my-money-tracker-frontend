import { IEnvironmentConfig } from 'shared/types/commonTypes';
import { DEV_VARIABLES } from './dev';
import { LOCAL_VARIABLES } from './local';
import { PRODUCTION_VARIABLES } from './production';

export const ENV = `${process.env.REACT_APP_ENVIRONMENT}`.trim() || 'local';

export const ENV_VARIABLES: Record<string, IEnvironmentConfig> = {
  local: LOCAL_VARIABLES,
  dev: DEV_VARIABLES,
  production: PRODUCTION_VARIABLES,
};

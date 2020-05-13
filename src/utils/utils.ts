// Copyright 2020 Cognite AS
import { Group } from '@cognite/sdk';
import { Capability } from 'custom-types';
import { QueryParams } from 'constants/widgetSettings';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { ADMIN_GROUPS, USER_REQUIRED_CAPABILITIES } from '../constants/appData';

export const generateRandomKey = () =>
  Math.random()
    .toString(36)
    .substring(7);

/**
 *
 * Auth Utils
 */
export const isFloat = (n: number | string) => {
  return Number(n) === n && n % 1 !== 0;
};

export const roundValue = (value: number | string) =>
  isFloat(value) ? Number(value).toFixed(2) : value;

export const getUserCapabilities = (groups: Group[]) =>
  groups
    .map(group =>
      group.capabilities?.map((capability: Capability) =>
        Object.keys(capability).map(capabilityKey =>
          capability[capabilityKey].actions.map(
            (action: string) => `${capabilityKey}:${action}`
          )
        )
      )
    )
    .toString()
    .split(',');

export const hasPermissions = (userCapabilities: string[]) =>
  USER_REQUIRED_CAPABILITIES.filter(userRequiredCapability =>
    userCapabilities.includes(userRequiredCapability)
  ).length === USER_REQUIRED_CAPABILITIES.length;

export const isAdmin = (groups: Group[]) =>
  groups.filter(group => ADMIN_GROUPS.includes(group.name)).length > 0;

/**
 * Used to get unique key from any objectt
 */
export const getUniqueKey = (source?: QueryParams) => {
  return source ? window.btoa(JSON.stringify(source)) : '';
};

/**
 * return an Array Which removed all elemnts in excludeArr;
 * @param originalArr string[]
 * @param excludeArr string[]
 */
export const removeObjects = (originalArr: string[], excludeArr: string[]) => {
  return filter(originalArr, key => {
    return !includes(excludeArr, key);
  });
};

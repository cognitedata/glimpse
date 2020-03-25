import { Group } from '@cognite/sdk';
import { Capability } from 'custom-types';
import { ADMIN_GROUPS, USER_REQUIRED_CAPABILITIES } from '../constants/appData';

export const generateRandomKey = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const clone = (items: any) =>
  items.map((item: any) => (Array.isArray(item) ? clone(item) : item));

/**
 *
 * Auth Utils
 */
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

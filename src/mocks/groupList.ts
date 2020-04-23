// Copyright 2020 Cognite AS
import { Group } from '@cognite/sdk';

export const groupList: Group[] = [
  {
    id: 1117562067424036,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'fileAcl:read',
    capabilities: [
      {
        filesAcl: {
          actions: ['READ'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
  {
    id: 1363537830786426,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'groups:list',
    capabilities: [
      {
        groupsAcl: {
          actions: ['LIST'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
  {
    id: 1604116607413083,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'Assets:Read',
    capabilities: [
      {
        assetsAcl: {
          actions: ['READ'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
  {
    id: 3094737480861564,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'groups:read',
    capabilities: [
      {
        groupsAcl: {
          actions: ['READ'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
  {
    id: 4916251487304958,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'Events:Write',
    sourceId: '',
    capabilities: [
      {
        eventsAcl: {
          actions: ['WRITE'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
  {
    id: 6452051536827631,
    isDeleted: false,
    deletedTime: new Date(),
    name: 'Timeseries:Read',
    capabilities: [
      {
        timeSeriesAcl: {
          actions: ['READ'],
          scope: {
            all: {},
          },
        },
      },
    ],
  },
];

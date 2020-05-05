// Copyright 2020 Cognite AS
export const mockWidgetConfigs = {
  test_user: {
    '12345678': [
      {
        valueMapping: {
          fields: [
            {
              label: 'Current Machine',
              key: 'name',
            },
          ],
        },
        widgetTypeId: 'ASSET_INFO',
        i: '4h0pf',
        cordinates: [3, 0],
      },
      {
        queryParams: {
          externalId: 'VAL_23-LIC-92521:Z.Y.Value',
          start: '8d-ago',
          end: 'now',
          limit: 1000,
          granularity: '1h',
        },
        valueMapping: {
          name: 'VAL_23-LIC-92521:Z.Y.Value',
          unit: '',
        },
        widgetTypeId: 'TIMESERIES_TALL_NUMERIC',
        i: '0bm73',
        cordinates: [0, 2],
      },
    ],
    '23456789': [
      {
        queryParams: {
          type: '***',
          subtype: 'VAL',
          ongoing: false,
        },
        valueMapping: {
          fields: [
            {
              key: 'id',
              label: 'id',
            },
          ],
        },
        widgetTypeId: 'EVENT_BASIC',
        i: 'zqehls',
        cordinates: [0, 0],
      },
      {
        valueMapping: {
          fields: [
            {
              label: 'Current Machine',
              key: 'name',
            },
          ],
        },
        widgetTypeId: 'ASSET_INFO',
        i: 'ydmazk',
        cordinates: [1, 0],
      },
    ],
  },
};

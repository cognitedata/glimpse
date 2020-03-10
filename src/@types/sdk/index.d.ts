declare module '@cognite/custom_sdk' {
  export interface AxisDisplayModeType {
    id: string;
    width: (axisWidth: number, numAxes: number) => number;
    toString: () => string;
  }

  export type YAccessor = (
    d: GetDoubleDatapoint | GetAggregateDatapoint
  ) => number;
}

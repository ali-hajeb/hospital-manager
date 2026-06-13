export interface IPieChartData {
    name: string;
    value: number;
    color: string;
}

export type ILineStats = {
  month: string;
} & Record<string, string | number>;

'use client'
import Dashboard from "@/src/components/Dashboard";
import { IRecordPopulated } from "@/src/lib/module/common/types";
import { Badge, Card, Grid, Group, Stack, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { PieChart, LineChart } from "@mantine/charts";
import axiosInstance from "@/src/lib/axios";
import { arrayShuffle } from "@/src/utils/arrayShuffle";
import { COLORS } from "@/src/constants/colors";
import UserContext from "@/src/contexts/UserContext";
import { JALALI_MONTHS } from "@/src/constants";
import { ILineStats, IPieChartData } from "@/src/common/types/chart.types";

const colors = arrayShuffle(COLORS);

export interface DashboardPanelProps {
    location?: string;
    title?: string;
}

export default function DashboardPanel({
    location,
    title
}: DashboardPanelProps) {
    const [records, setRecords] = useState<IRecordPopulated[]>([]);
    const [pieData, setPieData] = useState<IPieChartData[]>([]);
    const [lineData, setLineData] = useState<ILineStats[]>([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        axiosInstance.get('/chart/overview/line')
            .then(res => {
                const { stats } = res.data;
                const chartData = (stats as ILineStats[]).map(item => ({ 
                    ...item, 
                    month: JALALI_MONTHS[parseInt(item.month)] 
                }));
                console.log(chartData)
                setLineData(chartData);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
            });

        axiosInstance.get('/chart/overview/pie')
            .then(res => {
                const {stats} = res.data;
                const chartData = (stats as IPieChartData[]).map((item, i) => ({
                    ...item,
                    color: `${colors[i % colors.length]}.6`
                }))
                setPieData(chartData)
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
            });
    }, []);

    const getSeriesFromStats = (data: ILineStats) => {
        if (!data) return [];
        const {month, ...rest} = data;
        const series = Object.keys(rest);
        console.log( rest);
        return series.map((item, i) => ({name: item, color: colors[i % colors.length]}));
    }
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        { userContext?.role !== 'ADMIN' &&
        <Grid gap={'md'} mb={'md'}>
            {
                pieData && 
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                <Card shadow='md'>
                    <Title order={3} mb={'md'}>{'سهم از درآمد کل'}</Title>
                    <Group gap={'md'}>
                    <Stack gap={'md'}>
                        {pieData.map(item => (<Badge key={item.name} color={item.color}>{item.name}</Badge>))}
                    </Stack>
                    <PieChart 
                        h={340} 
                        size={250}
                        data={pieData} 
                        withLabelsLine={false} 
                        labelsPosition="outside" 
                        labelsType="percent" 
                        withLabels 
                        withTooltip 
                        tooltipDataSource="segment" 
                        mx="auto" />
                    </Group>
                </Card>
            </Grid.Col>
            }
            {
                lineData &&
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                <Card shadow='md'>
                    <Title order={3} mb={'md'}>{'روند درآمد'}</Title>
                    <LineChart
                        h={340}
                        data={lineData}
                        dataKey="month"
                        withLegend
                        withPointLabels
                        series={getSeriesFromStats(lineData[0])}
                    />
                </Card>
            </Grid.Col>
            }
        </Grid>
        }
        <Dashboard location={location} records={records} setRecords={setRecords}/>
    </>;
}


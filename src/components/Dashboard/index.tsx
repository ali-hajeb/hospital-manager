'use client'
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { ActionIcon, Button, Card, Grid, Group, NumberInput, Select, Stack, Text } from "@mantine/core";
import UserContext from "@/src/contexts/UserContext";
import moment from 'jalali-moment';
import { ILocation, locationActions } from "@/src/lib/module/location";
import { useForm } from "@mantine/form";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/components/TableView";
import { getCustomFieldValue } from "./utils";
import { recordSchemaFields } from "./constants";
import { IButtonState } from "@/src/common/types/button.types";
import { IRecordPopulated } from "@/src/lib/module/common/types";
import { INewRecord, recordActions } from "@/src/lib/module/record";
import { IconCalendar, IconCheck, IconExclamationCircle, IconPlus, IconPrinter, IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toFarsiNumber } from "@/src/utils/number";
import { RecordForm, SearchForm } from "./type";

const MAX_ROWS = 12;

export interface RecordProps {
    location?: string;
    records: IRecordPopulated[];
    setRecords:  Dispatch<SetStateAction<IRecordPopulated[]>>;
}

export default function Dashboard({
    location,
    records,
    setRecords
}: RecordProps) {
    const userContext = useContext(UserContext);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [isListLoading, setListLoading] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [deleteMode, setDeleteMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IRecordPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);

    const [opened, {open, close}] = useDisclosure(false);
    const currentDate = useMemo(() => {
        const m = moment().locale('fa');
        return toFarsiNumber(m.format('dddd D MMMM[ماه] YYYY'));
    }, [])

    const searchForm = useForm<SearchForm>({
        mode: 'controlled',
        initialValues: {
            location: '',
            year: '',
        }
    });

    const reportForm = useForm<RecordForm>({
        mode: 'controlled',
        // initialValues: {
        //     location: '',
        //     year: '',
        //     hospital: '', 
        //     month: '', 
        //     mDays: null, 
        //
        //     rIn: Number, 
        //     rOut: Number, 
        //     rDoc: Number, 
        //     vTotal: Number,   
        //     sTotal: Number,
        //     dTotal: Number,  
        //     beds: Number,     
        //     oDays: Number,    
        //     sDays: Number,    
        //     ins: Number,      
        //     ins1: Number,      
        //     ins2: Number,      
        //     ins3: Number,      
        //     received: Number, 
        //     ded: Number,      
        // }
    });

    const searchFormSubmitHandler = ({ location, year }: SearchForm) => {
    }

    useEffect(() => {
        if (userContext) {
            console.log("lll", location);
            const filter = userContext.role === 'MANAGER' || userContext.role === 'MANAGER_VIEW_ONLY' ? 
                location : userContext.location._id;
            recordActions.getRecords({ location: filter, skip: page.toString(), sort: '{ "hospital": -1 }' })
                .then((res) => {
                    setRecords(res.data.records);
                    setTotalPages(Math.ceil(res.data.count / MAX_ROWS));
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setListLoading(false)
                });
        }
    }, []);

    useEffect(() => {
        if (userContext?.role === 'MANAGER' || userContext?.role === 'MANAGER_VIEW_ONLY') {
            locationActions.getLocations()
                .then((res) => {
                    const locations = res.data.locations as ILocation[];
                    const locationOptions = locations.map(l => ({value: l._id, label: l.name}));
                    setLocationOptions(locationOptions);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, []);

    const modalOnCloseHandler = () => {
        reportForm.reset();
        setEditMode(null);
        setViewMode(null);
        setDeleteMode(null);
        setSubmitError(null);
        close();
    }

    const newrecordHandler = () => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setEditMode(null);
        setDeleteMode(null);
        open();
    }

    const deleteHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setEditMode(null);
        setDeleteMode(id);
        open();
    }

    const deleterecordHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setLoading(true);
        recordActions.deleteRecord(id)
            .then(_ => {
                setRecords(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === id);
                    if (index > -1) {
                        updated.splice(index, 1);
                    }
                    return updated;
                })
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const viewMaintenanceReportHandler = (id: string) => {
        const record = records.find(r => r._id === id);
        if (record) {
            setViewMode(record);
            open();
        }
    }

    const editrecordHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        console.log(id);
        const item = records.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { ...data} = item;
            reportForm.setValues({
                ...data,
                location: data.location?._id || '',
            });
            setEditMode(id);
            open();
        }
    }


    const formOnSubmit = async (values: RecordForm) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        const ins      = values.ins1 + values.ins2 + values.ins3;
        const totalRev      = values.rIn + values.rOut;
        const hospital = locationOptions.find(l => l.value === values.location)?.label;
        // console.log(values.beds, );
        const standardValue = {
            ...values,
            hospital,
            totalRev,
            location: userContext?.role === 'ADMIN' ? userContext.location._id : values.location,
            revPerBed     : values.beds   ? totalRev / values.beds        : 0,
            revPerOccDay  : values.oDays  ? totalRev / values.oDays       : 0,
            revCase       : values.dTotal ? values.rIn / values.dTotal            : 0,
            revVisit      : values.vTotal ? values.rOut / values.vTotal           : 0,
            revSurg       : values.sTotal ? values.rIn / values.sTotal            : 0,
            bor           : (values.beds * values.mDays) ? (values.oDays / (values.beds * values.mDays)) * 100 : 0,
            alos          : values.dTotal ? values.sDays / values.dTotal          : 0,
            surgIntensity : values.dTotal ? (values.sTotal / values.dTotal) * 100 : 0,
            dedPerc       : ins    ? (values.ded / ins) * 100       : 0,
            collRatio     : ins    ? (values.received / ins) * 100  : 0,
            docPct        : totalRev ? (values.rDoc / totalRev) * 100 : 0,
        } as INewRecord;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            recordActions.updateRecord({_id: editMode, ...standardValue}).then(res => {
                setRecords(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.record};
                    }
                    return updated;
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.log(error);
                    setSubmitError(error.response.data.message);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        } else {
            recordActions.createRecord(standardValue).then(res => {
                setRecords(s => {
                    return [...s, {...res.data?.record}];
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.log({...error});
                    setSubmitError(error.response.data.message);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        }
    }

    const searchHandler = (query: Record<string, string>) => {
        setListLoading(true);
        recordActions.getRecords({...query})
            .then((res) => {
                setRecords(res.data.records);
                setPage(0);
                setTotalPages(Math.ceil(res.data.count / MAX_ROWS));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false);
            });
    };

    return <>
        {/* <Title order={3}>{userContext?.firstName} عزیز، خوش آمدید!</Title> */}
        {/* <Text size="xs" c={'gray'}>{userContext?.location?.name}</Text> */}
        <Card shadow="md">
            <form onSubmit={searchForm.onSubmit((values) => searchFormSubmitHandler(values))}>
                <Group>
                    <Select
                        placeholder="مرکز را انتخاب کنید"
                        data={locationOptions}
                        key={searchForm.key('location')}
                        {...searchForm.getInputProps('location')}
                    />
                    <NumberInput
                        placeholder="سال"
                        key={searchForm.key('year')}
                        {...searchForm.getInputProps('year')}
                    />
                    <ActionIcon type="submit" size={'input-sm'}><IconSearch /></ActionIcon>
                    <ActionIcon onClick={newrecordHandler} size={'input-sm'}><IconPlus /></ActionIcon>
                    <ActionIcon variant="outline" size={'input-sm'}><IconPrinter /></ActionIcon>
                    <div className="flex-grow-1"></div>
                    <Group>
                        <IconCalendar color="gray" size={18} />
                        <Text size="xs" c={'gray'}>{currentDate}</Text>
                    </Group>
                </Group>
            </form>
        </Card>
        <Card shadow="md" mt={'md'}>
            <TableView>
                <TableView.Modal 
                    customFieldValue={getCustomFieldValue}
                    fields={recordSchemaFields}
                    viewMode={viewMode}
                    error={submitError}
                    deleteMode={deleteMode}
                    deleteItemHandler={deleterecordHandler}
                    close={close}
                    closeHandler={modalOnCloseHandler}
                    opened={opened}
                    title="ردیف"
                    editMode={editMode}>
                    <form onSubmit={reportForm.onSubmit(values => formOnSubmit(values))}>
                        <Stack gap={'md'}>
                            {
                                userContext?.role === 'MANAGER' &&
                                    <Select
                                        label='نام مرکز'
                                        placeholder="انتخاب کنید"
                                        data={locationOptions}
                                        key={reportForm.key('location')}
                                        {...reportForm.getInputProps('location')}
                                    />
                            }
                            {
                                renderFormFromSchema(recordSchemaFields, reportForm)
                            }
                            <Button type="submit" 
                                loading={isLoading} 
                                color={btnState.color} 
                                rightSection={btnState.icon}
                                fullWidth>
                                ثبت
                            </Button>
                        </Stack>
                    </form>
                </TableView.Modal>
                <TableView.TableContainer
                    customFieldValue={getCustomFieldValue}
                    viewItemHandler={viewMaintenanceReportHandler}
                    data={records}
                    fields={recordSchemaFields}
                    isLoading={isListLoading}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    deleteItemHandler={deleteHandler}
                    editItemHandler={editrecordHandler}
                    // scrollContainer={2000}
                    maxRows={MAX_ROWS} />
            </TableView>
        </Card>
        <Grid mt={'lg'}>
        </Grid>
    </>
}

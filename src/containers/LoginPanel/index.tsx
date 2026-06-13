'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
// import Logo from '@/public/logo-violet.png';
import { userActions } from "@/src/lib/module/user";
import useUser from "@/src/hooks/useUser";
// import { ISiteConfig, siteConfigActions } from "@/src/lib/module/config";

export type LoginForm = {
    username: string;
    password: string;
}

export default function LoginPanel({}) {
    const [isLoading, setLoading] = useState(false);
    const [copyright, setCopyright] = useState<string[]>([]);
    const { user } = useUser();
    const router = useRouter();

    const loginForm = useForm<LoginForm>({
        mode: 'controlled',
        initialValues: {
            username: '',
            password: '',
        }
    })

    useEffect(() => {
        // siteConfigActions.getSiteConfig()
        //     .then((res) => {
        //         setCopyright((res.data.config as ISiteConfig).copyright || []);
        //     }).catch(err => {
        //         console.error(err);
        //     })
        if (user?._id) {
            router.push('dashboard');
        }
    }, [user]);

    const loginOnClickHandler = ({ username, password }: LoginForm) => {
        setLoading(true);
        userActions.login({ username, password })
            .then(res => {
                console.log(res.data);
                router.push('dashboard')
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Container>
            <Center>
                <Box>
                    <Paper py={'md'} px={'lg'} bg={'white'} shadow='xl' radius={'md'}>
                        {/* <img src={Logo.src} style={{margin: '0 auto'}} alt='logo' width={256} height={256}/> */}
                        <Title order={1} ta={'center'} c={'blue.7'} mb={10} fz={'h2'}>
                            سامانه مدیریت درآمد بیمارستان‌ها
                        </Title>
                        <Title order={2} ta={'center'} c={'gray.6'} fz={'h4'}>
                            دانشکده علوم پزشکی بهبهان
                        </Title>

                        <Box>
                            <form onSubmit={loginForm.onSubmit(values => loginOnClickHandler(values))}>
                                <Stack gap={'md'} mt={'md'}>
                                    <TextInput
                                        label="نام کاربری"
                                        key={loginForm.key('username')}
                                        {...loginForm.getInputProps('username')}
                                    />
                                    <PasswordInput
                                        label="گذرواژه"
                                        key={loginForm.key('password')}
                                        {...loginForm.getInputProps('password')}
                                    />
                                    <Button loading={isLoading} type="submit" fullWidth>
                                        ورود
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Paper>
                    <Stack align="center" gap={0} mt={'md'}>
                        { copyright.map((t,i) => <Text key={i} fz='xs' c={'gray.0'} dir="auto">{t}</Text>) }
                    </Stack>
                </Box>
            </Center>
        </Container>
    );
}

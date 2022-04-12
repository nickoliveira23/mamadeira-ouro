import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams, } from '@react-navigation/native';

export type StackParamList = {
    Home: NavigatorScreenParams<TabParamList>;
    Index: undefined;
    Login: undefined;
    Email: undefined;
    Password: { user: string }
    Register: { id: string }
    EditDonor: { id: string }
};

export type TabParamList = {
    Profile: { id: string };
    Search: { id: string };
    Schedule: { id: string };
};
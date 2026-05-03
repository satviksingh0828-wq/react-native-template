import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
  Startup: undefined;
};

export type MainParamsList = {
  Authenticated: undefined;
  NameEntry: undefined;
};

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>;

export type MainScreenProps<T extends keyof MainParamsList> = CompositeScreenProps<
  StackScreenProps<MainParamsList, T>,
  ApplicationScreenProps
>;

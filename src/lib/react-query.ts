import { QueryClient, UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

type ArgsType = any;

const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
    retry: false,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export type ApiFnReturnType<FnType extends (...args: ArgsType[]) => Promise<ArgsType>> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<T extends (...args: ArgsType[]) => ArgsType> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: ArgsType[]) => Promise<ArgsType>> =
  UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>;

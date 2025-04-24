import { ResponseMessage } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useRouter } from "next/navigation";
interface MutationCallbacksProps<T> {
  // variant?: "save" | "create" | "update" | "delete";
  callback?: (data: T) => void;
}

export const useMutationCallbacks = <T extends ResponseMessage>(props?: MutationCallbacksProps<T>) => {
  const { message } = App.useApp();
  const router = useRouter();
  const queryClient = useQueryClient();
  return {
    onSuccess: async (data: T) => {
      queryClient.invalidateQueries();
      await message.success({
        content: data?.message ?? "OK",
        duration: 0.8,
      });
      if (props?.callback) {
        props.callback(data);
      } else {
        router.back();
      }
    },
  };
};

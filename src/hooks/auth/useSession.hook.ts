import { ROUTES } from "@/constants";
import { SessionData } from "@/type";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

async function fetchJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

export function useGetSession(): UseQueryResult<SessionData, Error> {
  return useQuery({
    queryKey: [ROUTES.auth.api.session, "GetSession"],
    queryFn: () =>
      fetchJson<SessionData>(ROUTES.auth.api.session, {
        method: "GET",
      }),
    staleTime: Infinity,
  });
}
export function useCreateSession() {
  return useMutation({
    mutationKey: [ROUTES.auth.api.session, "CreateSession"],
    mutationFn: (payload: SessionData) =>
      fetchJson<SessionData>(ROUTES.auth.api.session, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useDestroySession() {
  return useMutation({
    mutationKey: [ROUTES.auth.api.session, "DestroySession"],
    mutationFn: () =>
      fetchJson<SessionData>(ROUTES.auth.api.session, {
        method: "DELETE",
      }),
  });
}

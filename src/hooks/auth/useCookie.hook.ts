import { __IS_BROWSER__ } from "@/utils";
import { useState, useCallback } from "react";

interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "None" | "Lax" | "Strict";
}

const A_DAY_MILLISECONDS = 864e5;

function stringifyOptions(options: CookieOptions) {
  let result = "";

  result += options.path ? `; path=${options.path}` : "";
  result += options.domain ? `; domain=${options.domain}` : "";
  result += options.secure ? "; secure" : "";
  result += options.sameSite ? `; sameSite=${options.sameSite}` : "";

  return result;
}

function setCookie(name: string, value: string, options?: CookieOptions) {
  if (!__IS_BROWSER__) return;

  const optionsWithDefaults = { days: 7, path: "/", ...options };
  const expires = new Date(Date.now() + optionsWithDefaults.days * A_DAY_MILLISECONDS).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}${stringifyOptions(optionsWithDefaults)}`;
}

function getCookie(name: string, initialValue = "") {
  if (!__IS_BROWSER__) return initialValue;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.split("=")[0] === name);

  if (cookie) return decodeURIComponent(cookie.split("=")[1]);

  return initialValue;
}

function deleteCookie(name: string, path = "/") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

function useCookies(key: string, initialValue?: string) {
  const [item, setItem] = useState(() => getCookie(key, initialValue));

  const updateItem = useCallback(
    (value: string, options: CookieOptions) => {
      setItem(value);
      setCookie(key, value, options);
    },
    [key],
  );

  const deleteItem = useCallback(() => deleteCookie(key), [key]);

  return { item, updateItem, deleteItem };
}

export { stringifyOptions, setCookie, getCookie, useCookies, deleteCookie };

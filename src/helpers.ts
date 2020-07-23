import { useLayoutEffect, useEffect } from "react";

export const isServer = typeof window === "undefined";

export const useIsomorphicEffect = isServer ? useEffect : useLayoutEffect;

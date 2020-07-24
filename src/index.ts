import { useState, useCallback, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { useIsomorphicEffect } from './helpers';

export type Dimensions = {
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
export type DimensionsNode = HTMLElement | null;
export type DimensionsRef = React.RefObject<HTMLElement>;
export type UpdateDimensions = () => void;
export type UseDimensionsReturn = {
  ref: DimensionsRef;
  dimensions: Dimensions;
  updateDimensions: UpdateDimensions;
};

// Export hook
export function useDimensions(dependencies: any[] = []): UseDimensionsReturn {
  const ref = useRef<HTMLElement>(null);

  // Keep track of measurements
  const [dimensions, setDimensions] = useState<Dimensions>({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  // Define measure function
  const updateDimensions = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    setDimensions({
      x: rect.left,
      y: rect.top,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });
  }, [ref.current]);

  useIsomorphicEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    console.log('initial', element);
    // Set initial measurements
    updateDimensions();

    // Observe resizing of element
    const resizeObserver = new ResizeObserver(() => {
      console.log('resize', element);
      updateDimensions();
    });

    resizeObserver.observe(element);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current, updateDimensions, ...dependencies]);

  return {
    ref,
    dimensions,
    updateDimensions,
  };
}

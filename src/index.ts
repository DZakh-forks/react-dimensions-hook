import { useLayoutEffect, useState, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";

export interface Dimensions {
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

type DimensionsRef = (node: HTMLElement | null) => void;
type UpdateDimensions = () => void;
type UseDimensionsReturn = {
  ref: DimensionsRef;
  dimensions: Dimensions;
  updateDimensions: UpdateDimensions;
};

// Export hook
export function useDimensions(dependencies: any[] = []): UseDimensionsReturn {
  const [node, setNode] = useState<null | HTMLElement>(null);
  const ref = useCallback((newNode: HTMLElement | null) => {
    setNode(newNode);
  }, []);

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
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
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
  }, [node]);

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    // Set initial measurements
    updateDimensions();

    // Observe resizing of element
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(node);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [node, updateDimensions, ...dependencies]);

  return {
    ref,
    dimensions,
    updateDimensions,
  };
}

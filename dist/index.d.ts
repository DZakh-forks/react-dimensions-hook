export declare type Dimensions = {
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
export declare type DimensionsNode = HTMLElement | null;
export declare type DimensionsRef = (node: DimensionsNode) => void;
export declare type UpdateDimensions = () => void;
export declare type UseDimensionsReturn = {
  ref: DimensionsRef;
  dimensions: Dimensions;
  updateDimensions: UpdateDimensions;
};
export declare function useDimensions(
  dependencies?: any[]
): UseDimensionsReturn;
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
declare type DimensionsNode = HTMLElement | null;
declare type DimensionsRef = (node: DimensionsNode) => void;
declare type UpdateDimensions = () => void;
declare type UseDimensionsReturn = {
  ref: DimensionsRef;
  dimensions: Dimensions;
  updateDimensions: UpdateDimensions;
};
export declare function useDimensions(
  dependencies?: any[]
): UseDimensionsReturn;
export {};

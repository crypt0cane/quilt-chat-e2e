import BN from "bn.js";

export type Point = {
  x: BN;
  y: BN;
} | null;

export interface CurveData {
  type: string;
  p: BN;
  a: BN;
  b: BN;
  g: Point;
  n: BN;
  h: BN;
}

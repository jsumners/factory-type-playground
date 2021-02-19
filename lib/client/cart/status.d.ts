export interface StautsResult {
  address: string;
  items: array;
}
declare function status() : StatusResult;
export = status;

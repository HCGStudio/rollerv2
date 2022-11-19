export interface Data {
  mutators: Array<string>;
  maps: Array<string>;
  mapDescription: Array<string>;
  commanders: Array<string>;
}

declare const data: Data;
export default data;

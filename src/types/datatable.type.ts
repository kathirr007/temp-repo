export interface ColHeaders {
  fieldName: string;
  hideHeaderCol?: boolean;
  colType?: 'data' | 'action';
  attrs?: Record<string, any>;
}

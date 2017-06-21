export interface BlogEntry {
  title: string;
  showPublic: boolean;
  editEveryone: boolean;
  author?: string;
  content: string;
  date?: number;
  reverseDate?: number;
  $key?: number;
}

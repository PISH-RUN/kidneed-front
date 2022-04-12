export interface Model {
  id: number;
  createdAt: string;
  updatedAt: string;
  payload: any;
}

export interface Schedule extends Model {
  coins: number;
  duration: number;
  date: string;
  progress: number;
  done: boolean;
  child?: Child;
}

export interface Character extends Model {
  name: string;
  image?: unknown;
}

export interface Child extends Model {
  name: string;
  gender: "boy" | "girl";
  birthYear: number;
  budget: number;
  characters: Array<unknown>;
  psychologies: Array<unknown>;
  schedules: Array<unknown>;
}

export interface ChildPsychologie extends Model {
  point: number;
  question?: unknown;
  child?: Child;
}

export interface PsychologieQuestion extends Model {
  title: string;
  tag: unknown;
  category: "A" | "B" | "C" | "D";
}

export interface Step extends Model {
  month: number;
  year: number;
  actions?: Array<unknown>;
  childBalance?: Array<unknown>;
}

export interface User extends Model {
  mobile: string;
  name?: string;
  email?: string;
  unreadNotifications?: number
}

export interface Content extends Model {
  image: string,
  duration?: number,
  sourceLink?: string,
}

export interface Activity extends Model {
  id: number,
  content: Content,
}

export interface ChildDashboard extends Model {
  book: Array<Activity>,
  game: Array<Activity>,
  video: Array<Activity>,
  audio: Array<Activity>,
  activity: Array<Activity>,
}

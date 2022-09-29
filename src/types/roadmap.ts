import { TaggedTemplateExpression } from "typescript";
import { Status } from "./status";

export interface Roadmap {
  uid: string;
  name: string;
  rating: Number;
  author: string;
  tags: Object;
  levels: string;
  public: Boolean;
  // status: Status;
  // createdBy: string;
  // createdById: string;
  // createdAt: Date;
  // updatedAt?: Date;
  tasks: Paper[];
}

export interface NewRoadmap {
  // uid: string;
  name: string;
  createdBy: string;
  levels: string;
  tags: string;
  createdAt: Date;
}

export interface Paper {
  uid: string;
  name: string;
  description?: string;
  link: string;
  diffculty: number;
  publish: string;
  referenced_works: Object;
  related_works: Object;
  // status: Status;
  // createdAt: Date;
  // createdBy?: string;
  level: number;
}

import { User, Session } from 'next-auth';

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface UserProps {
  name: string;
  email: string;
  image: string;
  _id: string;
}

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  _id: string;
  creator: UserProps;
}

export interface ProjectCardProps {
  project: ProjectInterface;
}

export interface UserProfile {
  name: string;
  email: string;
  image: string;
  _id: string;
  description: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: ProjectInterface[];
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

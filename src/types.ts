export interface Profile {
  id: number;
  name: string;
  hero_title: string;
  hero_subtitle: string;
  about_text_1: string;
  about_text_2: string;
  profile_image_url?: string;
}

export interface Skill {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  image_url?: string;
  tags: string[];
}

export interface BentoSkill {
  id: number;
  title: string;
  description: string;
  icon: string;
}

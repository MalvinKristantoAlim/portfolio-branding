CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, hero_title TEXT, hero_subtitle TEXT,
  about_text_1 TEXT, about_text_2 TEXT
);
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT, title TEXT, description TEXT
);
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, period TEXT, description TEXT,
  image_url TEXT, tags TEXT
);

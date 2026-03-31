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
INSERT INTO profile (name, hero_title, hero_subtitle, about_text_1, about_text_2) 
VALUES ('Malvin Kristanto Alim', 'Grade 12 Student @ SMAK Frateran Surabaya', 'Focusing on Mathematics & System Optimization', 
'Saya adalah siswa kelas 12 yang memiliki minat besar dalam pemodelan matematika dan pengembangan solusi digital.', 
'Aktif dalam grup akademik ANOMANI dan berpengalaman dalam riset optimasi produksi UMKM.');

INSERT INTO skills (icon, title, description) 
VALUES ('📊', 'Math Modeling', 'Optimasi produksi menggunakan SPLDV.'),
       ('💻', 'Web Design', 'Membangun interface modern dengan Tailwind CSS.');

INSERT INTO projects (title, period, description, image_url, tags) 
VALUES ('NIKI ECHO Project', 'Februari 2026', 'Optimasi produksi minuman cup dan botol menggunakan model matematika.', 'https://via.placeholder.com/400', 'Math, Research');

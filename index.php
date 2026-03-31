<?php
/**
 * index.php - Single File Portfolio
 * Menggunakan PHP PDO & SQLite
 */

$db_file = 'database.sqlite';

try {
    // Koneksi ke SQLite
    $db = new PDO("sqlite:$db_file");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ambil Data
    $profile = $db->query("SELECT * FROM profile LIMIT 1")->fetch(PDO::FETCH_ASSOC);
    $skills = $db->query("SELECT * FROM skills")->fetchAll(PDO::FETCH_ASSOC);
    $projects = $db->query("SELECT * FROM projects")->fetchAll(PDO::FETCH_ASSOC);

    // Logika jika data kosong
    $is_empty = (!$profile && empty($skills) && empty($projects));

} catch (PDOException $e) {
    $error_msg = "Database Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $profile ? $profile['name'] : 'Portfolio'; ?> | Malvin Kristanto Alim</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'surface': '#131313',
                        'primary-cyan': '#00dbec',
                        'surface-container': '#201f1f',
                    },
                    fontFamily: {
                        'headline': ['Space Grotesk', 'sans-serif'],
                        'body': ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        body { background-color: #131313; color: #e5e2e1; }
    </style>
</head>
<body class="font-body selection:bg-cyan-500/30">

    <?php if ($is_empty): ?>
        <div class="min-h-screen flex items-center justify-center">
            <div class="text-center p-8 bg-surface-container rounded-2xl border border-white/5">
                <span class="material-symbols-outlined text-6xl text-cyan-400 mb-4">database_off</span>
                <h1 class="text-2xl font-headline font-bold">Data belum diisi</h1>
                <p class="text-neutral-500 mt-2">Silakan isi database.sqlite Anda terlebih dahulu.</p>
            </div>
        </div>
    <?php else: ?>

        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 bg-neutral-900/40 backdrop-blur-xl border-b border-white/5 h-20">
            <div class="flex justify-between items-center max-w-7xl mx-auto px-8 h-full">
                <div class="text-xl font-bold tracking-tighter text-cyan-400 font-headline">
                    <?php echo $profile['name']; ?>
                </div>
                <div class="hidden md:flex items-center space-x-8 font-headline tracking-tight">
                    <a class="text-cyan-400 font-bold" href="#hero">Home</a>
                    <a class="text-neutral-400 hover:text-neutral-200 transition-colors" href="#about">About</a>
                    <a class="text-neutral-400 hover:text-neutral-200 transition-colors" href="#experience">Experience</a>
                    <a class="text-neutral-400 hover:text-neutral-200 transition-colors" href="#skills">Skills</a>
                    <a class="text-neutral-400 hover:text-neutral-200 transition-colors" href="#projects">Projects</a>
                </div>
            </div>
        </nav>

        <!-- PAGE 1: HERO, ABOUT, EXPERIENCE -->
        <main>
            <!-- Hero Section -->
            <section id="hero" class="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                    <div class="lg:col-span-8 space-y-8">
                        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase">
                            Digital Architect Portfolio
                        </div>
                        <h1 class="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-[1.1]">
                            Halo, Saya <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"><?php echo $profile['name']; ?></span>.
                        </h1>
                        <p class="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed">
                            <?php echo $profile['hero_subtitle']; ?>
                        </p>
                        <div class="flex gap-4">
                            <a href="#projects" class="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,219,236,0.3)] transition-all">Lihat Proyek</a>
                            <a href="#" class="px-8 py-4 border border-white/10 font-bold rounded-xl hover:bg-white/5 transition-all">Hubungi Saya</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="py-32 bg-surface-container/30">
                <div class="max-w-7xl mx-auto px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div class="lg:col-span-4">
                            <h2 class="text-4xl font-headline font-bold text-cyan-400 tracking-tight mb-4">About Me</h2>
                            <div class="h-1 w-20 bg-cyan-500"></div>
                        </div>
                        <div class="lg:col-span-8 space-y-8">
                            <p class="text-2xl font-light leading-relaxed"><?php echo $profile['about_text_1']; ?></p>
                            <p class="text-xl text-neutral-400 leading-relaxed"><?php echo $profile['about_text_2']; ?></p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Experience Section -->
            <section id="experience" class="py-32">
                <div class="max-w-7xl mx-auto px-8">
                    <h2 class="text-4xl font-headline font-bold mb-16">Pengalaman Utama</h2>
                    <?php foreach ($projects as $project): ?>
                        <div class="bg-surface-container rounded-2xl border border-white/5 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center mb-12">
                            <div class="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden bg-black/20">
                                <img src="<?php echo $project['image_url']; ?>" class="w-full h-full object-cover" alt="Project">
                            </div>
                            <div class="w-full md:w-1/2 space-y-6">
                                <div>
                                    <h3 class="text-3xl font-headline font-bold"><?php echo $project['title']; ?></h3>
                                    <p class="text-cyan-400 mt-1"><?php echo $project['period']; ?></p>
                                </div>
                                <p class="text-neutral-400 text-lg leading-relaxed"><?php echo $project['description']; ?></p>
                                <div class="flex flex-wrap gap-2">
                                    <?php 
                                    $tags = explode(',', $project['tags']);
                                    foreach ($tags as $tag): ?>
                                        <span class="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold"><?php echo trim($tag); ?></span>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- PAGE 2: SKILLS & PROJECTS GRID -->
            <section id="skills" class="py-32 bg-surface-container/30">
                <div class="max-w-7xl mx-auto px-8">
                    <h2 class="text-4xl font-headline font-bold mb-16 text-center">Skills & Expertise</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <?php foreach ($skills as $skill): ?>
                            <div class="p-8 bg-surface-container rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                                <span class="material-symbols-outlined text-4xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform"><?php echo $skill['icon']; ?></span>
                                <h3 class="text-xl font-headline font-bold mb-4"><?php echo $skill['title']; ?></h3>
                                <p class="text-neutral-400"><?php echo $skill['description']; ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>
        </main>

        <footer class="py-12 border-t border-white/5 text-center text-neutral-500 text-sm">
            <p>© 2024 <?php echo $profile['name']; ?>. Engineered with Logic.</p>
        </footer>

    <?php endif; ?>

</body>
</html>

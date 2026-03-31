<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Malvin Portfolio | Digital Excellence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap">
    <style>
        :root {
            --surface: #050505;
            --surface-container: #0f172a;
            --primary-cyan: #8b5cf6;
            --accent-teal: #d8b4fe;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--surface);
            color: white;
            overflow-x: hidden;
        }
        .apple-text-gradient {
            background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .btn-timbul {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.3);
        }
        .btn-timbul:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -12px rgba(139, 92, 246, 0.5);
        }
        .btn-timbul:active {
            transform: translateY(0) scale(0.95);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 2rem;
        }
        .view-section {
            display: none;
        }
        .view-section.active {
            display: block;
            animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <?php
    $db_file = 'database.sqlite';
    try {
        $db = new PDO("sqlite:$db_file");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $profile = $db->query("SELECT * FROM profile LIMIT 1")->fetch(PDO::FETCH_ASSOC);
        $skills = $db->query("SELECT * FROM skills")->fetchAll(PDO::FETCH_ASSOC);
        $projects = $db->query("SELECT * FROM projects")->fetchAll(PDO::FETCH_ASSOC);
        $is_empty = (!$profile && empty($skills) && empty($projects));
    } catch (PDOException $e) {
        $is_empty = true;
    }

    function getIcon($name) {
        $icons = [
            'mail' => '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
            'github' => '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
            'code' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
            'function' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
            'groups' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
            'terminal' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
            'chevron_right' => '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'
        ];
        return $icons[$name] ?? $icons['code'];
    }
    ?>

    <?php if ($is_empty): ?>
        <div class="min-h-screen flex items-center justify-center">
            <div class="glass-card p-12 text-center space-y-4">
                <div class="text-[#8b5cf6]/20 flex justify-center">
                    <?php echo getIcon('terminal'); ?>
                </div>
                <h1 class="text-2xl font-bold">Data belum diisi</h1>
                <p class="text-white/40">Silakan isi database.sqlite Anda terlebih dahulu.</p>
            </div>
        </div>
    <?php else: ?>
        <!-- Navigation -->
        <nav class="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 h-16">
            <div class="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
                <div onclick="showView('home')" class="text-lg font-semibold tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2">
                    <div class="w-8 h-8 bg-[#8b5cf6] rounded-lg flex items-center justify-center text-white font-bold">M</div>
                    <?php echo $profile['name']; ?>
                </div>
                <div class="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-wide text-white/60">
                    <button onclick="showView('home')" class="nav-link hover:text-white transition-colors" data-view="home">Home</button>
                    <button onclick="showView('works')" class="nav-link hover:text-white transition-colors" data-view="works">Works & Skills</button>
                    <a href="mailto:malvinkristantoalim1@gmail.com" class="px-5 py-2 bg-[#8b5cf6] text-white rounded-full font-bold btn-timbul flex items-center gap-2">
                        <?php echo getIcon('mail'); ?>
                        Contact
                    </a>
                </div>
            </div>
        </nav>

        <main class="pt-16 min-h-screen">
            <!-- HOME VIEW -->
            <div id="view-home" class="view-section active">
                <!-- Hero -->
                <section class="relative min-h-[85vh] flex items-center px-6 overflow-hidden">
                    <div class="max-w-5xl mx-auto text-center space-y-10 relative z-10">
                        <h1 class="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] apple-text-gradient">
                            <?php echo $profile['hero_title']; ?>
                        </h1>
                        <p class="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed">
                            <?php echo $profile['hero_subtitle']; ?>
                        </p>
                        <div class="flex flex-wrap justify-center gap-6 pt-6">
                            <button onclick="showView('works')" class="px-10 py-4 bg-[#8b5cf6] text-white font-bold rounded-full text-lg btn-timbul flex items-center gap-3">
                                Explore Works <?php echo getIcon('chevron_right'); ?>
                            </button>
                            <button onclick="window.location.href='mailto:malvinkristantoalim1@gmail.com'" class="px-10 py-4 bg-white/5 text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 transition-all btn-timbul">
                                Get in Touch
                            </button>
                        </div>
                    </div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8b5cf6]/5 rounded-full blur-[160px] -z-10"></div>
                </section>

                <!-- About -->
                <section class="py-32 px-6">
                    <div class="max-w-7xl mx-auto">
                        <div class="glass-card p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div class="space-y-8">
                                <h2 class="text-4xl md:text-5xl font-bold tracking-tight">The Story</h2>
                                <div class="space-y-6 text-xl text-white/60 leading-relaxed font-light">
                                    <p><?php echo $profile['about_text_1']; ?></p>
                                    <p><?php echo $profile['about_text_2']; ?></p>
                                </div>
                            </div>
                            <div class="relative aspect-square rounded-3xl overflow-hidden group">
                                <img src="https://lh3.googleusercontent.com/aida/ADBb0uiMggPnN9uuSmRMw__1uov0mQp9SJKx76Y_L3vSH3v6ce4r9XTd-SvmhrvcWs_uuZ4IFcaQnRXLJ98DfAa700LFvaCpS5uOB3CofrZU5JHUC6MeYMbHwKZ1zP6_rd0Sp-fR3qXDsdzH73mAZHC7USyL5yYr8EoVB1RGvvp6AxeF8U-YsSV2sKH_u4iuBVX5TSNU1AtFGj6QMMmSBzbuCtWY4oYxb6gvfCICghtrpd_6n_-21YJYvw8DvgYA-SApnWm2C37UVwtxCY4" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Profile">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- WORKS VIEW -->
            <div id="view-works" class="view-section">
                <!-- Projects -->
                <section class="max-w-7xl mx-auto px-6 py-20 space-y-20">
                    <div class="text-center space-y-4">
                        <h2 class="text-5xl md:text-7xl font-bold tracking-tighter apple-text-gradient">Featured Works</h2>
                        <p class="text-xl text-white/40">A collection of logic-driven digital experiences.</p>
                    </div>

                    <div class="grid grid-cols-1 gap-12">
                        <?php foreach ($projects as $project): ?>
                            <div class="glass-card overflow-hidden group flex flex-col lg:flex-row items-stretch">
                                <div class="w-full lg:w-3/5 aspect-video overflow-hidden bg-white/5">
                                    <img src="<?php echo $project['image_url']; ?>" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="<?php echo $project['title']; ?>">
                                </div>
                                <div class="w-full lg:w-2/5 p-10 md:p-16 flex flex-col justify-center space-y-8">
                                    <div class="space-y-2">
                                        <span class="text-[#8b5cf6] font-bold tracking-widest uppercase text-xs"><?php echo $project['period']; ?></span>
                                        <h3 class="text-3xl md:text-4xl font-bold tracking-tight"><?php echo $project['title']; ?></h3>
                                    </div>
                                    <p class="text-lg text-white/60 leading-relaxed"><?php echo $project['description']; ?></p>
                                    <div class="flex flex-wrap gap-3">
                                        <?php foreach (explode(',', $project['tags']) as $tag): ?>
                                            <span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80"><?php echo trim($tag); ?></span>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </section>

                <!-- Skills -->
                <section class="max-w-7xl mx-auto px-6 py-32 space-y-20">
                    <div class="text-center space-y-4">
                        <h2 class="text-5xl font-bold tracking-tighter apple-text-gradient">Core Capabilities</h2>
                        <p class="text-xl text-white/40">Bridging the gap between mathematics and technology.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <?php foreach ($skills as $skill): ?>
                            <div class="glass-card p-10 space-y-6 hover:bg-white/10 transition-colors group">
                                <div class="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center group-hover:bg-[#8b5cf6]/20 transition-colors text-[#8b5cf6]">
                                    <?php echo getIcon($skill['icon']); ?>
                                </div>
                                <div class="space-y-3">
                                    <h3 class="text-2xl font-bold tracking-tight"><?php echo $skill['title']; ?></h3>
                                    <p class="text-white/50 leading-relaxed"><?php echo $skill['description']; ?></p>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </section>
            </div>
        </main>

        <!-- Footer -->
        <footer class="w-full py-20 bg-black border-t border-white/10">
            <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="space-y-4">
                    <div class="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                        <?php echo $profile['name']; ?>
                    </div>
                    <p class="text-white/40 font-medium max-w-sm">Crafting digital excellence through mathematical precision and modern engineering.</p>
                    <p class="text-white/20 text-sm">© 2024 Malvin Kristanto Alim. All rights reserved.</p>
                </div>
                <div class="flex flex-wrap gap-8 md:justify-end">
                    <a href="mailto:malvinkristantoalim1@gmail.com" class="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                        <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#8b5cf6]/20 transition-colors border border-white/5 text-[#8b5cf6]">
                            <?php echo getIcon('mail'); ?>
                        </div>
                        <span class="font-medium">Email</span>
                    </a>
                    <a href="https://github.com/MalvinKristantoAlim" target="_blank" class="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                        <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#8b5cf6]/20 transition-colors border border-white/5 text-[#8b5cf6]">
                            <?php echo getIcon('github'); ?>
                        </div>
                        <span class="font-medium">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    <?php endif; ?>

    <script>
        function showView(viewId) {
            document.querySelectorAll('.view-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('view-' + viewId).classList.add('active');
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('data-view') === viewId) {
                    link.classList.add('text-white', 'font-bold');
                    link.classList.remove('text-white/60');
                } else {
                    link.classList.remove('text-white', 'font-bold');
                    link.classList.add('text-white/60');
                }
            });

            // Reset scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Initialize
        showView('home');
    </script>
</body>
</html>

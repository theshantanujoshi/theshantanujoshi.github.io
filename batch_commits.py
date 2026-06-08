import os
import subprocess
import glob

def run(cmd):
    try:
        subprocess.run(cmd, shell=True, check=True)
    except Exception as e:
        print(f"Failed: {cmd}")

# 1. Init
run('git init')
run('git remote add origin https://github.com/theshantanujoshi/portfolio-v2.git')

# 2. Config & Scaffolding
files = ['package.json', 'package-lock.json', 'vite.config.ts', 'tsconfig.json', 'tsconfig.node.json', 'index.html', 'eslint.config.js']
existing = [f for f in files if os.path.exists(f)]
run('git add ' + ' '.join(existing))
run('git commit -m "chore: project scaffolding and vite dependencies"')

# 3. Tailwind & CSS
files = ['src/main.tsx', 'src/index.css', 'postcss.config.js', 'tailwind.config.js', 'public/']
existing = [f for f in files if os.path.exists(f) or os.path.exists(f.strip('/'))]
run('git add ' + ' '.join(existing))
run('git commit -m "chore: configure tailwindcss and global entry points"')

# 4. Data & Types
run('git add src/types.ts src/data.ts')
run('git commit -m "feat: define data schemas and content payload"')

# 5. Components
run('git add src/components/')
run('git commit -m "feat: implement signature animation and velocity scrolls"')

# 6. Canvas
run('git add src/LineWaves.tsx src/LineWaves.css')
run('git commit -m "feat: integrate interactive ogl webgl canvas"')

# 7. Project Assets (Batch 1)
run('git add src/assets/projects/aurafit*.png src/assets/projects/codelore_1.png src/assets/projects/codelore_2.png src/assets/projects/codelore_3.png src/assets/projects/codelore_4.png src/assets/projects/codelore_5.png src/assets/projects/codelore_6.png src/assets/projects/codelore_7.png')
run('git commit -m "chore: import project architecture screens (part 1)"')

# 8. Project Assets (Batch 2)
run('git add src/assets/projects/codelore_8.png src/assets/projects/codelore_9.png src/assets/projects/codelore_10.png src/assets/projects/codelore_11.png src/assets/projects/codelore_12.png src/assets/projects/codelore_13.png src/assets/projects/codelore_14.png src/assets/projects/holocron*.png')
run('git commit -m "chore: import project architecture screens (part 2)"')

# 9. Gallery Assets (10 at a time)
for i in range(1, 6):
    start = (i - 1) * 10 + 1
    end = i * 10
    cmd = "git add " + " ".join([f"src/assets/journal/journal_{j}.jpg" for j in range(start, end + 1)])
    run(cmd)
    run(f'git commit -m "chore: process gallery raw images (batch {i}/5)"')

# 10. App
run('git add src/App.tsx')
run('git commit -m "feat: implement landing page and spatial navigation"')

# 11. Readme
run('git add README.md')
run('git commit -m "docs: write brutalist readme"')

# 12. Anything else left behind
run('git add .')
run('git commit -m "chore: final polish and minor fixes"')

print("DONE")

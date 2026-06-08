import os
from PIL import Image
import concurrent.futures

journal_dir = r"c:\Users\Shantanu Joshi\Desktop\popolio\src\assets\journal"

def process_image(filename):
    if not filename.endswith(".jpg"):
        return
    filepath = os.path.join(journal_dir, filename)
    try:
        with Image.open(filepath) as img:
            img = img.convert("RGB")
            
            # Use 1200px max size - high enough for crisp viewing, small enough to load fast
            max_size = 1200
            if img.width > max_size or img.height > max_size:
                img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            
            # Save with high quality to preserve details
            img.save(filepath, "JPEG", optimize=True, quality=85)
            print(f"Compressed {filename}")
    except Exception as e:
        print(f"Failed to process {filename}: {e}")

filenames = os.listdir(journal_dir)

# Process in parallel to speed up
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    executor.map(process_image, filenames)

import os
from PIL import Image, ImageFilter

directory = r"C:\ShineFactory"
files = ["car_01_ext_far.png", "car_02_ext_mid.png", "car_03_door_handle.png"]

TARGET_SIZE = (3840, 3840)

for file in files:
    path = os.path.join(directory, file)
    print(f"Enhancing {file}...")
    try:
        with Image.open(path) as img:
            img_resized = img.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
            img_sharp = img_resized.filter(ImageFilter.UnsharpMask(radius=2, percent=200, threshold=3))
            img_sharp.save(path, quality=100)
    except Exception as e:
        print(f"Error fixing {file}: {e}")

print("Enhancement complete.")

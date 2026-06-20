#!/usr/bin/env python3
"""
Converts all TIFF images in a folder to WebP.
Usage: python tiff_to_webp.py <input_folder> [output_folder] [quality]
If no output folder is given, WebP files are saved alongside the originals.
Quality defaults to 95 (1-100).
"""

import sys
import os
from PIL import Image

def convert(input_path, output_path, quality):
    im = Image.open(input_path)
    if im.mode == 'CMYK':
        im = im.convert('RGB')
    elif im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    im.save(output_path, 'WEBP', quality=quality)
    size_kb = os.path.getsize(output_path) // 1024
    print(f"  {os.path.basename(input_path)} -> {os.path.basename(output_path)} ({size_kb} KB)")

def main():
    if len(sys.argv) < 2:
        print("Usage: python tiff_to_webp.py <input_folder> [output_folder] [quality]")
        sys.exit(1)

    input_folder = sys.argv[1]
    output_folder = sys.argv[2] if len(sys.argv) >= 3 else None
    quality = int(sys.argv[3]) if len(sys.argv) >= 4 else 95

    if output_folder and not os.path.exists(output_folder):
        os.makedirs(output_folder)

    files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.tiff', '.tif'))]

    if not files:
        print("No TIFF files found.")
        sys.exit(0)

    print(f"Converting {len(files)} file(s) at quality {quality}...")
    for f in sorted(files):
        input_path = os.path.join(input_folder, f)
        out_name = os.path.splitext(f)[0] + '.webp'
        out_dir = output_folder if output_folder else input_folder
        output_path = os.path.join(out_dir, out_name)
        convert(input_path, output_path, quality)

    print("Done.")

if __name__ == '__main__':
    main()

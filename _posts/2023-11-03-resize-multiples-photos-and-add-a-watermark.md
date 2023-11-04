---
layout: post
title: "Resize multiple photos and add a watermark"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
I was looking for something which permit to process a lot of photos via command line, and my dream came true by using the well known [ImageMagick](https://imagemagick.org/index.php).

On Ubuntu you can install it like this:
```shell
sudo apt update
sudo apt install imagemagick
```

### Resize multiples photos

Resize a photo to 10% of it's size.
```shell
convert 2023-07-19-13h23m02.JPG -quality 100% -resize 10% 2023-07-19-13h23m02-resized.JPG
```

Resize multiple photos (current directory).
```shell
for photo in `ls ./`; do
    convert ${photo} -quality 100% -resize 10% resized-${photo}
done
```

### Add a watermark to an image

The command below is issued from ImageQuick documentation (see [Water Marking](https://www.imagemagick.org/Usage/annotating/#watermarking)).

I use one of the font available on my machine ([Noto-Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono), see `convert -list font`), set the size to 48, and use the text `Copyright - Rémi Debord` as watermark.

```shell
convert 2023-07-19-13h23m02.JPG  -font Noto-Mono -pointsize 48 -draw "gravity southeast
                fill black  text 0,12 'Copyright - Rémi Debord' \
                fill white  text 1,11 'Copyright - Rémi Debord' " \
          2023-07-19-13h23m02-watermarked.JPG
```

### Scripts

Script for resizing multiples photos (usage: `./resize.sh [files] [resize]`).
```bash
#!/bin/bash

images="${*:1:$#-1}"
value="${*:$#}"

for image in ${images}; do
        directory=${image%/*}
        file=${image##*/}
        ext=${image##*.}

        convert ${image} -resize ${value} ${directory}/resized-${file%.*}.${ext}
done
```

Script for watermarking multiples photos (usage: `./watermark.sh [files] [watermark]`).
```bash
#!/bin/bash

images="${*:1:$#-1}"
value="${*:$#}"

font="Noto-Mono"
size="48"
position="southeast"

for image in ${images}; do
        directory=${image%/*}
        file=${image##*/}

        convert ${image}  -font ${font} -pointsize ${size} -draw "gravity ${position}
                                        fill black  text 0,12 ' ${value} ' \
                                        fill white  text 1,11 ' ${value} ' " \
                                        ${directory}/watermarked-${file}
done
```

### References

- [How to batch resize and compress images in linux](https://shyamjos.com/batch-resize-compress-photos-linux/)
- [Using Image Magick to create watermarks.](https://amytabb.com/til/photography/2021/01/23/image-magick-watermark/)
- [Image Magick - Watermarking](https://www.imagemagick.org/Usage/annotating/#watermarking)
- [Image Magick - Command line options](https://legacy.imagemagick.org/script/command-line-options.php?#draw)
# script to convert iphone images from heic to jpgs
# Run as: sh picture-converter-script.sh ../../content/projects/wilted-sunflower-and-butterfly-1

cd "$1" #argument #1 is the path

# Convert heic to jpg & remove the heic file
# using image magick library
for file in *.heic; do 
    magick $file ${file%.heic}.jpg
    rm $file
done

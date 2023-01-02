# script to convert iphone images to jpgs
# Run as: sh picture-converter-script.sh ../content/projects/wilted-sunflower-and-butterfly-1

cd "$1" #argument #1 is the path

# Rename all *.jpg to *.heic
for file in *.jpg
do
  mv "$file" "${file%.jpg}.heic"
done

# Convert heic to jpg & remove the heic file
for file in *.heic; do 
    convert $file ${file%.heic}.jpg
    rm $file
done

#!/bin/bash


cd project/
random=$1
cp app.js app_$random.js
cp static/our_path.html static/$random.html
cp reset.js reset_$random.js

sed -i 's/Keys_To_Reset.txt/'$random'.txt/' reset_$random.js
sed -i 's/our_path/'$random'/' app_$random.js
sed -i 's/Keys_To_Reset.txt/'$random'.txt/' app_$random.js
sed -i 's/our_path/'$random'/' static/$random.html


timeout $2 node app_$random.js

node reset_$random.js

rm app_$random.js static/$random.html reset_$random.js $random.txt;



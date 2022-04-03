# This script uploads the contents of ./out to S3.
# All html-files are stripped of their extensions for cleaner URLs.

cd ./out

aws s3 cp . s3://$S3_BUCKET/ --recursive --exclude "*.html" --acl public-read --cache-control max-age=604800
aws s3 cp index.html s3://$S3_BUCKET/ --acl public-read

for file in $(find . -name '*.html' | sed 's|^\./||'); do
    aws s3 cp ${file%} s3://$S3_BUCKET/${file%.*} --content-type 'text/html' --acl public-read
done
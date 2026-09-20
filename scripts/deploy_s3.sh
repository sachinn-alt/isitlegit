#!/bin/bash
set -e

REGION="${AWS_REGION:-ap-south-1}"
RANDOM_SUFFIX=$(head /dev/urandom | tr -dc a-z0-9 | head -c 6)
BUCKET_NAME="isitlegit-app-${RANDOM_SUFFIX}"

echo "=================================================="
echo "🚀 Deploying IsItLegit Serverless to AWS S3..."
echo "📍 Target Region: $REGION"
echo "🪣 Bucket Name:   $BUCKET_NAME"
echo "=================================================="

# 1. Build project if dist does not exist
if [ ! -d "dist" ]; then
  echo "📦 Building production bundle..."
  npm ci
  npm run build
fi

# 2. Create S3 Bucket
echo "🔧 Creating S3 bucket..."
if [ "$REGION" = "us-east-1" ]; then
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
else
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION"
fi

# 3. Disable Block Public Access
echo "🔓 Configuring public access..."
aws s3api put-public-access-block --bucket "$BUCKET_NAME" \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 4. Attach Public Read Bucket Policy
echo "📜 Attaching website bucket policy..."
cat <<EOF > /tmp/s3-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/s3-policy.json

# 5. Enable Static Website Hosting
echo "🌐 Enabling static website hosting..."
aws s3api put-bucket-website --bucket "$BUCKET_NAME" \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "404.html"}
  }'

# 6. Upload dist/ files
echo "📤 Uploading dist/ files to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME/" --delete

# 7. Print live URL
if [ "$REGION" = "us-east-1" ]; then
  WEBSITE_URL="http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com"
else
  WEBSITE_URL="http://${BUCKET_NAME}.s3-website.${REGION}.amazonaws.com"
fi

echo ""
echo "=================================================="
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "🌐 Live Website URL: $WEBSITE_URL"
echo "=================================================="

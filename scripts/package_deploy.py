import os
import zipfile

def package_dist():
    dist_dir = 'dist'
    zip_path = 'isitlegit-deploy.zip'
    
    if not os.path.exists(dist_dir):
        print("dist directory does not exist! Run 'npm run build' first.")
        return
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, dist_dir)
                # Standardize path separators to Unix forward slashes
                arcname = rel_path.replace('\\', '/')
                zf.write(abs_path, arcname)
                print(f"Added: {arcname}")
                
    print(f"\nSuccessfully generated Unix-compliant {zip_path} ({os.path.getsize(zip_path)} bytes)")

if __name__ == '__main__':
    package_dist()

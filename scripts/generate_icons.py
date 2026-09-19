import math
from PIL import Image, ImageDraw

def create_icon(size):
    img = Image.new("RGBA", (size, size), (2, 6, 23, 255))
    draw = ImageDraw.Draw(img)
    
    scale = size / 64.0
    
    # Shield points scaled from viewBox 64x64
    # Outer shield
    shield_pts = [
        (32 * scale, 6 * scale),
        (10 * scale, 16 * scale),
        (10 * scale, 32 * scale),
        (19.4 * scale, 48 * scale),
        (32 * scale, 58 * scale),
        (44.6 * scale, 48 * scale),
        (54 * scale, 32 * scale),
        (54 * scale, 16 * scale),
    ]
    
    # Draw dark shield fill
    draw.polygon(shield_pts, fill=(15, 23, 42, 255))
    
    # Draw shield gradient / border
    border_w = max(2, int(3 * scale))
    draw.polygon(shield_pts, outline=(59, 130, 246, 255), width=border_w)
    
    # Inner glow shield
    inner_pts = [
        (32 * scale, 12 * scale),
        (16 * scale, 20 * scale),
        (16 * scale, 32 * scale),
        (22.3 * scale, 44 * scale),
        (32 * scale, 52 * scale),
        (41.7 * scale, 44 * scale),
        (48 * scale, 32 * scale),
        (48 * scale, 20 * scale),
    ]
    draw.polygon(inner_pts, fill=(30, 58, 138, 90), outline=(96, 165, 250, 180), width=max(1, int(1.5 * scale)))
    
    # Radar concentric circles
    cx, cy = 32 * scale, 32 * scale
    r1 = 14 * scale
    draw.ellipse([cx - r1, cy - r1, cx + r1, cy + r1], outline=(56, 189, 248, 160), width=max(1, int(1.5 * scale)))
    
    r2 = 7 * scale
    draw.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], outline=(96, 165, 250, 220), width=max(1, int(1.5 * scale)))
    
    # Verified checkmark
    check_pts = [
        (25 * scale, 32 * scale),
        (29.5 * scale, 37 * scale),
        (39 * scale, 26 * scale),
    ]
    check_w = max(3, int(4 * scale))
    # Soft glow around checkmark
    draw.line(check_pts, fill=(56, 189, 248, 120), width=check_w + 4, joint="round")
    draw.line(check_pts, fill=(56, 189, 248, 255), width=check_w, joint="round")
    draw.line(check_pts, fill=(240, 249, 255, 255), width=max(1, int(check_w / 2)), joint="round")
    
    return img

if __name__ == "__main__":
    icon_512 = create_icon(512)
    icon_512.save("public/icon-512.png", "PNG")
    
    icon_192 = create_icon(192)
    icon_192.save("public/icon-192.png", "PNG")
    
    apple_icon = create_icon(180)
    apple_icon.save("public/apple-touch-icon.png", "PNG")
    
    print("PWA Icons successfully generated in public/")

import { describe, it, expect } from 'vitest';
import { checkFileConfidentiality, checkTextConfidentiality } from '@/utils/confidentiality';

describe('Confidentiality Guard', () => {
  it('blocks sensitive photo uploads based on filename keywords', () => {
    const sensitiveFile1 = new File([''], 'my_passport_photo.jpg', { type: 'image/jpeg' });
    const check1 = checkFileConfidentiality(sensitiveFile1);
    expect(check1.isBlocked).toBe(true);

    const sensitiveFile2 = new File([''], 'aadhaar_card_front.png', { type: 'image/png' });
    const check2 = checkFileConfidentiality(sensitiveFile2);
    expect(check2.isBlocked).toBe(true);

    const sensitiveFile3 = new File([''], 'credit_card_cvv.webp', { type: 'image/webp' });
    const check3 = checkFileConfidentiality(sensitiveFile3);
    expect(check3.isBlocked).toBe(true);

    const sensitiveFile4 = new File([''], 'driver_license_scan.jpg', { type: 'image/jpeg' });
    const check4 = checkFileConfidentiality(sensitiveFile4);
    expect(check4.isBlocked).toBe(true);
  });

  it('allows safe screenshots of SMS and phishing links', () => {
    const safeFile1 = new File([''], 'sms_screenshot_warning.png', { type: 'image/png' });
    const check1 = checkFileConfidentiality(safeFile1);
    expect(check1.isBlocked).toBe(false);

    const safeFile2 = new File([''], 'suspicious_qr_menu.jpg', { type: 'image/jpeg' });
    const check2 = checkFileConfidentiality(safeFile2);
    expect(check2.isBlocked).toBe(false);
  });

  it('detects unredacted credit card numbers and SSN patterns in payload text', () => {
    const cardText = 'Payment details: 4111111111111111 expires 12/28';
    const check1 = checkTextConfidentiality(cardText);
    expect(check1.isBlocked).toBe(true);

    const ssnText = 'Tax ID: 000-12-3456';
    const check2 = checkTextConfidentiality(ssnText);
    expect(check2.isBlocked).toBe(true);

    const safeText = 'Check out this website: https://example.com/login';
    const check3 = checkTextConfidentiality(safeText);
    expect(check3.isBlocked).toBe(false);
  });
});

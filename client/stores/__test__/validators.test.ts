import { lang } from '../../../lang';
import { email, minLength, required } from '../validators';

describe('Validators', () => {
  describe('email', () => {
    const boundEmail = email('email');
    const invalidEmail = lang.EMAIL_VALIDATOR('email');
    it('should allow `ben@twofer.co`', () => {
      expect(boundEmail('ben@twofer.co')).toBe(false);
    });

    it('should not allow `ben@twofer`', () => {
      expect(boundEmail('ben@twofer')).toBe(invalidEmail);
    });

    it('should allow an empty value', () => {
      expect(boundEmail('')).toBe(false);
    });
  });

  describe('minLength', () => {
    const boundMinLength = minLength('test', 7);

    it('should accept values over 7', () => {
      expect(boundMinLength('over seven characters')).toBe(false);
    });

    it('should not accept values under 7', () => {
      expect(boundMinLength('small')).toBe(
        lang.MIN_LENGTH_VALIDATOR('test', 7)
      );
    });
  });
});

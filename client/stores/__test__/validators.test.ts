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
  });
});

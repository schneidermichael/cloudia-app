import { AwsSimpleOptionsDto } from './awssimpleoptions.dto';

describe('AuthDto', () => {
  let awssimpleoptions: AwsSimpleOptionsDto;

  beforeEach(() => {
    awssimpleoptions = new AwsSimpleOptionsDto();
  });

  describe('constructor', () => {
    it('should return true', () => {
      expect(awssimpleoptions).toBeTruthy();
    });
  });
});

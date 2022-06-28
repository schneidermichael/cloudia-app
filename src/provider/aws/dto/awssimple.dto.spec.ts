import { AwsSimpleDto } from './awssimple.dto';

describe('AwsSimpleDto', () => {
  let awssimpleoptions: AwsSimpleDto;

  beforeEach(() => {
    awssimpleoptions = new AwsSimpleDto();
    awssimpleoptions.Cost = 50;
    awssimpleoptions.InstanceType = 'west-asia';
    awssimpleoptions.Memory = '24 GB';
    awssimpleoptions.MonthlyPrice = 5;
    awssimpleoptions.Network = 'WAN';
    awssimpleoptions.SpotPrice = '15';
    awssimpleoptions.Storage = '100';
    awssimpleoptions.VCPUS = 4;
  });

  describe('constructor', () => {
    it('should return Cost', () => {
      expect(awssimpleoptions.Cost).toBe(50);
    });
    it('should return InstanceType', () => {
      expect(awssimpleoptions.InstanceType).toBe('west-asia');
    });
    it('should return Memory', () => {
      expect(awssimpleoptions.Memory).toBe('24 GB');
    });
    it('should return MonthlyPrice', () => {
      expect(awssimpleoptions.MonthlyPrice).toBe(5);
    });
    it('should return Network', () => {
      expect(awssimpleoptions.Network).toBe('WAN');
    });
    it('should return SpotPrice', () => {
      expect(awssimpleoptions.SpotPrice).toBe('15');
    });
    it('should return Storage', () => {
      expect(awssimpleoptions.Storage).toBe('100');
    });
    it('should return VCPUS', () => {
      expect(awssimpleoptions.VCPUS).toBe(4);
    });
  });
});

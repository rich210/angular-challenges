import { HeavyComputationPipe } from './heavyComputation.pipe';

describe('HeavyComputationPipe', () => {
  it('create an instance', () => {
    const pipe = new HeavyComputationPipe();
    expect(pipe).toBeTruthy();
  });
});

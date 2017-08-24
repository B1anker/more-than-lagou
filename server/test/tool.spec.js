import { parseJSON } from '../utils/tool'

import { expect } from 'chai'

describe('Test parseJSON', function() {
  it('should be a=b', function() {
    expect(parseJSON({a: 'b'})).to.be.equal('a=b')
  })
  it('should be a=b&c=d', function() {
    expect(parseJSON({a: 'b', c: 'd'})).to.be.equal('a=b&c=d')
  })
})
import { getConfig } from '../src/getConfig'
import runAll from '../src/runAll'

jest.unmock('execa')

describe('runAll', () => {
  it('should throw when not in a git directory', async () => {
    const config = getConfig({ concurrent: true, cwd: '/' })
    await expect(runAll(config)).rejects.toThrowErrorMatchingSnapshot()
  })
})

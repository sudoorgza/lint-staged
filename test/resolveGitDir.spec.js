import path from 'path'
import resolveGitDir from '../src/resolveGitDir'

/**
 * resolveGitDir runs execa, so the mock needs to be disabled for these tests
 */
jest.unmock('execa')

describe('resolveGitDir', () => {
  it('should resolve to current working dir when .git is in the same dir', async () => {
    const expected = process.cwd()
    expect(await resolveGitDir()).toEqual(expected)
  })

  it('should resolve to the parent dir when .git is in the parent dir', async () => {
    const expected = path.dirname(__dirname)
    const processCwdBkp = process.cwd
    process.cwd = () => __dirname
    // path.resolve to strip trailing slash
    expect(path.resolve(await resolveGitDir())).toEqual(expected)
    process.cwd = processCwdBkp
  })

  it('should return null when not in a git directory', async () => {
    const gitDir = await resolveGitDir({ cwd: '/' }) // assume root is not a git directory
    expect(gitDir).toEqual(null)
  })
})

import { getLatestVersion } from '../../scripts/publish'
import { test1 } from '../../test/scripts/test'
beforeAll(() => {
  console.log('吃完饭后，走进了红浪漫洗浴')
})

beforeEach(() => {
  console.log('给了300元钱后......')
})
test('getLatestVersion 测试', () => {
  return test1()
  // expect(response.data).toEqual({
  //   success: true,
  // })
})

afterEach(() => {
  console.log('完成后，我心满意足的坐在沙发上！！！')
})

afterAll(() => {
  console.log('有钱人的生活就是这么的枯燥且寂寞')
})

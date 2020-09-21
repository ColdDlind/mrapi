
import {
    openAPIPrefix,
    graphqlAPIPrefix,
  } from '../src/constants'

  beforeAll(() => {
    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  describe('constant tests', () => {
    test('openAPIPrefix test', () => {
        expect(openAPIPrefix).toEqual('api')
    })
    test('graphqlAPIPrefix test', () => {
        expect(graphqlAPIPrefix).toEqual('graphql')
    })
  })
  describe('function tests', () => {
  })
  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(() => {
    console.log('afterAll')
  })

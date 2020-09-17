export default class SoundPlayer {
    foo: string
    constructor() {
      this.foo = 'bar'
    }

    playSoundFile(fileName) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('Playing sound file ' + fileName)
    }
  }

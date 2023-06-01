import {
  generateMessage,
  MESSAGE_FW_VERSION,
  MESSAGE_FW_VERSION_WRONG_CRC,
  MESSAGE_FW_VERSION_WRONG_END,
} from './vesc-messages'
import VescMessageHandler from './vescMessageHandler'
import VescMessageParser from './vescMessageParser'

describe('The vescMessageHandler', () => {
  let parser
  let queueMessage

  beforeEach(() => {
    jest.mock('./vescMessageParser')
    parser = new VescMessageParser()
    queueMessage = jest.spyOn(parser, 'queueMessage')
  })

  it('should process a message', done => {
    let payload = generateMessage(MESSAGE_FW_VERSION)
    let vescMessageHandler = new VescMessageHandler(parser)

    vescMessageHandler.queueMessage(payload)
    expect(queueMessage).toBeCalled()
    done()
  })

  it('should fail with CRC error', done => {
    let payload = generateMessage(MESSAGE_FW_VERSION_WRONG_CRC)
    let vescMessageHandler = new VescMessageHandler(parser)

    vescMessageHandler.queueMessage(payload)
    expect(queueMessage).not.toBeCalled()
    done()
  })

  it('should fail withwron packet end error', done => {
    let payload = generateMessage(MESSAGE_FW_VERSION_WRONG_END)
    let vescMessageHandler = new VescMessageHandler(parser)

    vescMessageHandler.queueMessage(payload)
    expect(queueMessage).not.toBeCalled()
    done()
  })
})

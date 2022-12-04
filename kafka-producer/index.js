const { Kafka } = require('kafkajs')
const { setTimeout } = require('timers/promises')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

async function main() {
  await producer.connect()

  let count = 0
  while(true) {
    console.log('send message from producer.')
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: `Hello KafkaJS user!:${count}` },
      ],
    })

    count++
    if (count > 99) {
      break;
    }
    await setTimeout(5000)
  }

  await producer.disconnect()
}

main()

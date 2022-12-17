const { Kafka } = require('kafkajs')
const { setTimeout } = require('timers/promises')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function main() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'example', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`received from consumer: ${message.value.toString()}`)
      await setTimeout(5000)
    },
  })
}

main()

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function main() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`received from consumer: ${message.value.toString()}`)
    },
  })
}

main()

import mongoose from 'mongoose'

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connectToDB = async () => {
  const connectionUrl =
    'mongodb+srv://mdbaizedhasans:rl4JXusa7ftVCCFG@cluster0.ynv9wfn.mongodb.net/'
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log('Ecommers database connect successfully'))
    .catch((error) =>
      console.log(`getting error from db connection ${error.message}`)
    )
}

export default connectToDB

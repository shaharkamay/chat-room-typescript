import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      autoIndex: false,
      retryWrites: false,
    },
    url: process.env.MONGO_URI || 'mongodb+srv://database-shaharkamay:vcVfXAHipeBiBEVztUi2@cluster0.mj3y0.mongodb.net/chat-room?retryWrites=true&w=majority',
  },
  server: {
    host: 'localhost',
    port: process.env.PORT || 8080,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    accessTime: process.env.ACCESS_TIME || '',
    refreshTime: process.env.REFRESH_TIME || '',
  }
};

export default config;
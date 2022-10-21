require('dotenv').config();
import { app } from './app';

const PORT = process.env.NODE_DOCKER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

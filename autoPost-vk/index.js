const { VK } = require('vk-io');

const vk = new VK({ token: '' });
const { api } = vk;

try {
  api.wall.post({
    owner_id: -36801393,
    from_group: 1,
    message: 'Test',
  });
} catch (err) {
  throw new Error(err);
}

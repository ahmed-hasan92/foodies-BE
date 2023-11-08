function generateRandom() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `User${randomNumber}`;
}

module.exports = {
  generateRandom,
};

function generateToken() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }
  
  function calculateDays(amount) {
    return Math.floor(amount / 100);
  }
  
  module.exports = {
    generateToken,
    calculateDays
  };


// All the data to create spends should came from database
class Spend {
  constructor(params) {
    // Information of spend
    this.name = params.name;

    // Value: Money
    this.value = params.value;

    // Name of payer
    this.payer = params.payer;

    // List of members that will share that spend
    this.shareholder = params.shareholder || [params.payer];

    // Divisor: For calculation
    this.divisor = this.shareholder.length;

    // Per share
    this.per_share = this.value / this.divisor;

  }
  // Custom method to increment the count
  updateShareholder = (target_name) => {
    if (this.shareholder.includes(target_name)){
      this.shareholder = this.shareholder.filter(name => name !== target_name);
    } else {
      this.shareholder.push(target_name);
    }
  }
}

export default Spend;
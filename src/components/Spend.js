

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
  // Function to update divisor value
  updateDivisor = () => {
    this.divisor = this.shareholder.length;
  }

  // Function to update Per share value
  updatePerShare = () => {
    this.per_share = this.value / this.divisor;
  }

  // Function to update shareholder list
  updateShareholder = (target_name) => {
    // If target_name already in shareholder list => Remove it from list else => Add it
    if (this.shareholder.includes(target_name)){
      if (this.shareholder.length === 1){
        return false
      }
      this.shareholder = this.shareholder.filter(name => name !== target_name);
    } else {
      this.shareholder.push(target_name);
    };

    // Update divisor and value of pershare after update shareholder list
    // Note: To implement the state for whole spend object
    // instead of have separate state for each property in this object
    this.updateDivisor();
    this.updatePerShare();
    return true
  }


}

export default Spend;
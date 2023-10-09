
// All the data to create spends should came from database
class Spend {
  constructor(params) {
    // Information of spend
    this.id = params._id;

    // Information of spend
    this.name = params.name;

    // Value: Money
    this.value = Number(params.value);

    // Name of payer
    this.payer = params.payer;

    // List of members that will share that spend
    this.shareholder = params.shareholder || [params.payer];



    // Divisor: For calculation
    this.divisor = this.shareholder.length;

    // Per share
    this.perShare = this.value / this.divisor;

    // Stagin variable
    this.hash = this.createHashString()

  }
  // Function to update payer
  updatePayer = (newPayer) => {
    if (newPayer !== this.payer){
      this.payer = newPayer;
    }
  }

  // Function to update name
  updateName = (newName) => {
    if (newName){
      this.name = newName;
    }
  }

  // Function to update spend value
  updateValue = (newValue) => {
    newValue = Number(newValue);
    if (newValue !== this.value){
      this.value = newValue;
      this.updatePerShare()
    }
  }

  // Function to update divisor value
  updateDivisor = () => {
    this.divisor = this.shareholder.length;
  }

  // Function to update Per share value
  updatePerShare = () => {
    this.perShare = this.value / this.divisor;
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

  // Function to create hash string to check if object is updated
  createHashString = () => {
    // Data to hash
    const hash = this.id + this.name + this.value + this.payer + this.shareholder;
    return hash
  }

  // Function to check if object is change
  isChanged = () => {
    const currentHash = this.createHashString()
    if (currentHash === this.hash){
      return false
    }
    return true
  }

  // Function to check if object is change
  isHaveToPay = (memberName) => {
    if (this.shareholder.includes(memberName)){
      return true
    }
    return false
  }


};

export default Spend;
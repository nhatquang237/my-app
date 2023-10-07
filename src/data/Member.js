// All the data to create spends should came from database
import {numberWithCommas} from '../utils/StringUtils';

class Member {
  constructor(name) {

    // Name of member: Must be unique
    this.name = name;

    // Sum of this member's spends
    this.spending = 0;

    // Money that member had already paid
    this.amountSpent = 0;

    // Remaining amount = amountSpent - spending;
    this.remaining = 0;

  }
  // For presentation purpose
  getSpending () {
    return numberWithCommas(this.spending)
  }
  getAmountSpent () {
    return numberWithCommas(this.amountSpent)
  }
  getRemaining () {
    return numberWithCommas(this.remaining)
  }

  // Function to update spending value of this member
  updateSpending = (increment) => {
    if (increment > 0){
      this.spending += increment;
      this.updateRemaining()
    }
  }

  // Function to update amount of money that member had already spent
  // including paying for another member stuff
  updateAmountSpent = (increment) => {
    if (increment > 0){
      this.amountSpent += increment;
      this.updateRemaining()
    }
  }

  // Function to update remaining
  updateRemaining = () => {
    this.remaining = this.amountSpent - this.spending;
  }

  // Function to create hash string to check if object is updated
  createHashString = () => {
    // Data to hash
    const hash = this.name + this.spending + this.amountSpent;
    return hash
  }

  // Function to check if object is change
  isChanged = () => {
    const currentHash = this.createHashString()
    if (currentHash === this.hash){
      return false
    }
    this.hash = currentHash;
    return true
  }
};

export default Member;
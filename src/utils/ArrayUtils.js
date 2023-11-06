
// Function use for updating state of components that have state value equal to a list.
export const update_list = (targetList, newValue, index) => {
// Create a new list that is a copy of the old list using the spread operator
// another way to do is use: Array.from()
const updatedList = [...targetList];

if(index !== undefined){
  updatedList[index] = newValue;
}

return updatedList
}

// Function use for updating state of components that have state value equal to an object.
export const update_object = (originalObject, updatedValue, updatedProp) => {
  // Create a copy of the form state object
  const updatedObject = { ...originalObject };

  // Update the specific property in the copied object
  updatedObject[updatedProp] = updatedValue;

  return updatedObject
}

/**
 * Description
 * This function deletes an item from a JavaScript array at a specified index and returns a new array without the deleted item.
 * If the index is out of range, it returns the original array unaltered.
 *
 * Parameters
 * @param {Array} array : The input array from which to delete an item.
 * @param {int} indexToDelete : The index of the item to delete from the array.
 * Returns
 * @returns {Array}: A new array with the specified item removed, or the original array if the index is out of range.
 */

export const deleteItemAtIndex = (array, indexToDelete) => {
  if (indexToDelete >= 0 && indexToDelete < array.length) {
    // Use slice to create a new array without the item at the specified index
    const newArray = [...array.slice(0, indexToDelete), ...array.slice(indexToDelete + 1)];
    return newArray;
  } else {
    console.error('Index out of range');
    return array; // Return the original array unchanged
  }
}

/**
 * Description
 * This function deletes an item from a JavaScript array at a specified value and returns a new array without the deleted item.
 * If the index is out of range, it returns the original array unaltered.
 *
 * Parameters
 * @param {Array} array : The input array from which to delete an item.
 * @param {any} valueToRemove : The value of the item to delete from the array.
 * Returns
 * @returns {Array}: A new array with the specified item removed
 */
export const removeItemByValue = (array, valueToRemove) => {
  return array.filter(item => item !== valueToRemove);
}


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
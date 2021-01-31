// Get the input
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

// Add event listener
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

let lastChecked;

function handleCheck(e) {
  // Check if the shift key has been pressed down
  // AND check that the checkbox was checked as it loops through
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them in between!');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

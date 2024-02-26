// Testing forked git repo
// For notes on how to use this plugin:
// https://www.codecademy.com/article/getting-user-input-in-node-js
const prompt = require("prompt-sync")({ sigint: true });

// Keeps our list of guests for the wedding
const guests = [];

/**
 * Outputs a templated text string representing their wedding invitation
 * @param {object} guest The object representing this guest
 */
const outputInvitation = (guest, showPersonalGreeting = false) => {
  return `
  Dear ${guest.fullName}, you and your ${guest.numGuests} guests are invited to our wedding. 
  All ${guest.numInParty} of you will be served a delicious ${guest.dish}.
  ${showPersonalGreeting ? guest.personalGreeting : ''}
  We will call you soon at ${guest.phone} to confirm.
  `;
};

/**
 * Creates a guest object from given values
 * @param {object} input The raw input gathered from the user
 * @returns An object representing this guest
 */
const createGuest = (input) => {
  const dish = input.vegan === "y" ? "salad" : "steak";

  return {
    fullName: input.fullName,

    // Immediately executes the function just returned
    personalGreeting: getPersonalGreeting(input.brideOrGroom)(input.outOfTown),
    
    numGuests: parseInt(input.numGuests),
    numInParty: parseInt(input.numGuests) + 1,
    phone: input.phone,
    dish,
    outOfTown: input.outOfTown,
  };
};

/**
 * Gets a function that computes a personal greeting for the guest
 * @param {string} brideOrGroom A string indicating if they are a guest of the bride or groom (b or g)
 * @returns A function that prompts for the guests out of town status
 */
const getPersonalGreeting = (brideOrGroom) => {
  const host = brideOrGroom === "b" ? "bride" : "groom";
  return (outOfTown) => {
    let greeting = `The ${host} would like to thank you personally for attending`;
    return (greeting += outOfTown === "y" ? " from so far out of town." : ".");
  };
};

/**
 * Gets input from the user by prompting them in the console
 * @returns An object containing the user input
 */
function getInput() {
  const fullName = prompt("Enter guest name:");
  const brideOrGroom = prompt("With the bride or groom? (b or g)");
  const numGuests = prompt("Enter the number of guests:");
  const phone = prompt("Enter the contact phone number:");
  const vegan = prompt("Is the party vegan? (y or n):");
  const outOfTown = prompt("Traveling from out of town? (y or n)");
  return { fullName, brideOrGroom, numGuests, phone, vegan, outOfTown };
}

let continueApp; // Flag used to indicate we want to keep using the app

// The main execution loop of this app
do {
  const input = getInput();
  const newGuest = createGuest(input);
  guests.push(newGuest);

  // Output the guest invites to the console
  guests.forEach((guest) => console.log(outputInvitation(guest, true)));

  continueApp = prompt("Do you wish to add another guest: (type n to quit)");
} while (continueApp !== "n");

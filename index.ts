class Client {
  name: string;
  availability: boolean[]; // true for available, false for unavailable
  preferences: string[];

  constructor(name: string, availability: boolean[], preferences: string[]) {
    this.name = name;
    this.availability = availability;
    this.preferences = preferences;
  }
}

class Staff {
  name: string;
  availability: boolean[]; // true for available, false for unavailable
  preferences: string[];

  constructor(name: string, availability: boolean[], preferences: string[]) {
    this.name = name;
    this.availability = availability;
    this.preferences = preferences;
  }
}

function generateWeeklySchedule(clients: Client[], staff: Staff[]): string[][] {
  const schedule: string[][] = [];

  // Generate an empty schedule for the week
  for (let i = 0; i < 7; i++) {
    schedule[i] = [];
    for (let j = 0; j < 96; j++) {
      schedule[i][j] = "";
    }
  }

  // Assign clients to staff members based on availability and preferences
  for (const client of clients) {
    let bestMatch: Staff | null = null;
    let bestScore = -Infinity;

    for (const staffMember of staff) {
      let score = 0;

      // Compare availability and preferences for each time slot
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 96; j++) {
          if (client.availability[j] && staffMember.availability[j]) {
            // Increase score if both client and staff are available
            score++;

            // Increase score based on preference match
            if (client.preferences.includes(schedule[i][j])) {
              score++;
            }
            if (staffMember.preferences.includes(schedule[i][j])) {
              score++;
            }
          }
        }
      }

      // Update best match if the current staff member has a higher score
      if (score > bestScore) {
        bestMatch = staffMember;
        bestScore = score;
      }
    }

    // Assign the client to the best matching staff member for each time slot
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 96; j++) {
        if (client.availability[j] && bestMatch?.availability[j]) {
          schedule[i][j] = `${client.name} - ${bestMatch.name}`;
        }
      }
    }
  }

  return schedule;
}

// Sample data for testing
const clients: Client[] = [
  new Client(
    "Client 1",
    [true, true, true, true, true, true, true],
    ["Preference 1", "Preference 2"]
  ),
  new Client(
    "Client 2",
    [true, true, true, true, true, true, true],
    ["Preference 3", "Preference 4"]
  ),
];

const staff: Staff[] = [
  new Staff(
    "Staff 1",
    [true, true, true, true, true, true, true],
    ["Preference 1", "Preference 3"]
  ),
  new Staff(
    "Staff 2",
    [true, true, true, true, true, true, true],
    ["Preference 2", "Preference 4"]
  ),
];

const schedule = generateWeeklySchedule(clients, staff);
console.log(schedule);

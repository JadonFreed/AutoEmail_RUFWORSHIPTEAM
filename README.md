Google Sheets Scheduling and Automail Program
This script is designed to streamline the communication process for a music team, providing details about the upcoming large group worship event, including the music lineup, team member roles, and songs for the current week.

Here's a breakdown of the key functionalities:

Data Retrieval Functions:

- getVocals, getGuitar, getKeys, getPercussion, getMisc: Retrieve team members for different roles (vocals, guitar, keys, percussion, misc) from the Google Sheet.
- getMusic: Retrieve music information from the Google Sheet.
Date and Time Functions:

- getCurrentDate: Get the current date.
- getNextThursdayDate: Calculate the date for the next Thursday. (day each event takes place)

Email Composition Functions:

- getEmailList: Compose a list of email recipients based on the current lineup.
- sendEmail: Compose and send an email to the worship team with the lineup information for the upcoming large group worship event.

Utility Functions:

- removeDups: Remove duplicate values from an array.
- nameToEmail: Convert names to corresponding email addresses.

User Confirmation:

- The script prompts the user with a confirmation message before sending the email to ensure the accuracy of the recipients.

function sendWorshipScheduleEmail() {
    const [voc, guit, keys, perc, misc, music] = [getVocals(), getGuitar(), getKeys(), getPercussion(), getMisc(), getMusic()];
    const currDate = getCurrentDate();
    const nextThursdayDate = getNextThursdayDate();
    
    const recipients = getEmailList();
    
    const subject = `RUF Large Group Worship Lineup: ${nextThursdayDate}`;
    const body = `Hey y'all! \n \nThanks for your help this week :) \n \nHere is the lineup:\n`+
      `\nMusic: \n\n${music.join("\n")}\n\n`+
      `\nVocals: ${voc.join(", ")}\nGuitar: ${guit.join()}\nKeys: ${keys.join()}\nPercussion: ${perc.join()}\nViolin/Flute: ${misc.join()}`+
      `\n \nPractice and set up are in DL 104 at 7:30 PM as usual.`+
      `\n \nAll music is found in the Google Drive files! Text one of us if you have any issues with accessing the music.`+
      `\n \nAppreciate all your help and feel free to contact us with any questions!`+
      `\n \n   Jadon🤠 and Nick🦅`;
  
    const confirm = Browser.msgBox('send confirmation', `Are you sure you want to send this mail ?\n Recipients include: ${recipients.join(", ")}`, Browser.Buttons.OK_CANCEL);
    if (confirm === 'ok') { 
      MailApp.sendEmail("jadonfr17@gmail.com", subject, body);
    }
  
    //sendSemesterAvailabilityEmail();
  }
  
  function sendSemesterAvailabilityEmail() {
    const recipients = getEmailList();
    MailApp.sendEmail(recipients.join(), "Worship Team Semester Availability", "Hey Y'all! \nPlease fill out this google form for your availability for Large Group this semester.\n https://forms.gle/4EFwCMY7Q6Am9iL66 \nThanks,\n Jadon");
  }
  
  function getSheetData(range) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getRange(range).getValues();
  
    const result = [];
    for (const rowData of data) {
      if (rowData[0] !== "") {
        result.push(rowData[0]);
      }
    }
    return result;
  }
  
  function separateDataIntoArrays() {
    const [vocals, guitar, keys, percussion, misc] = ["E8:E11", "F8:F11", "G8:G11", "H8:H11", "I8:I11"].map(getSheetData);
    // Log the arrays
    // Logger.log("Vocals: " + vocals);
    // Logger.log("Guitar: " + guitar);
    // Logger.log("Keys: " + keys);
    // Logger.log("Percussion: " + percussion);
    // Logger.log("Misc: " + misc);
  }
  
  function nameToEmail() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Name & Email List");
    const data = sheet.getRange("A2:B30").getValues();
  
    const nameAndEmailArray = data
      .filter(([name, email]) => name !== "" && email !== "")
      .map(([name, email]) => [name, email]);
  
  
    // Logger.log(nameAndEmailArray);
  
    return nameAndEmailArray;
  }
  
  function allEmails() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Name & Email List");
    var data = sheet.getRange("B2:B30").getValues();
  
    
    var allEmails = [];
  
    for (var i = 0; i < data.length; i++) {
      // Check if both name and email are not empty before adding to the array
      if (data[i] !== "") {
  
        allEmails.push([data[i]])
      }
    }
  
    // Log the 2D array
    //  Logger.log(nameAndEmailArray);
  
    // Optionally, you can return the array for further processing
    return allEmails;
  }
  
  function removeDups(data) {
    var newData = [];
  
    data.forEach(function(value) {
        if (newData.indexOf(value) == -1) {
          newData.push(value);
      }
    });
    return newData;
  }
  
  function getEmailByName(nameToFind) {
    var data = nameToEmail();
    
    for (var i = 0; i < data.length; i++) {
      var name = data[i][0];
      // var firstName = name.split(" ");
      var email = data[i][1];
      if(name.includes(nameToFind)){
        return email;
      }
      // if (name===nameToFind||name===firstName) {
      //   return email;
      // }
    }
    
    return "Name not found";
  }
  
  function getCurrentLGinfo(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("E8:I11").getValues();
  
    var vocals = [];
    var guitar = [];
    var keys = [];
    var percussion = [];
    var misc = [];
    
  
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      vocals.push(rowData[0]);
      guitar.push(rowData[1]);
      keys.push(rowData[2]);
      percussion.push(rowData[3]);
      misc.push(rowData[4]);
    }
  
    var allNames = [];
    
    function addNonEmptyNamesToArray(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== "") {
          allNames.push(arr[i]);
        }
      }
    }
    addNonEmptyNamesToArray(vocals);
    addNonEmptyNamesToArray(guitar);
    addNonEmptyNamesToArray(keys);
    addNonEmptyNamesToArray(percussion);
    addNonEmptyNamesToArray(misc);
    removeDups(allNames);
    // Logger.log("Vocals: " + vocals);
    // Logger.log("Guitar: " + guitar);
    // Logger.log("Keys: " + keys);
    // Logger.log("Percussion: " + percussion);
    // Logger.log("Misc: " + misc);
    Logger.log("All Names: " + allNames);
  
    return allNames;
  }
  
  
  function getEmailList() {
    // Get the list of all names using getDataAndCreateArrays function
    var allNames = getCurrentLGinfo();
  
    // Initialize an empty array to store the emails
    var recipients = [];
    recipients.push(...["MAK513@pitt.edu", "JWF46@pitt.edu", "NAM213@pitt.edu"]);
  
  
    // Loop through all names and add corresponding emails to recipients
    for (var i = 0; i < allNames.length; i++) {
      var name = allNames[i];
      var email = getEmailByName(name);
      recipients.push(email);
    }
  
    // Log the recipients array
    Logger.log("Recipients: " + recipients);
  
    return recipients;
  }
  
  function getVocals(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("E8:E11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  
  function getGuitar(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("F8:F11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  
  function getKeys(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("G8:G11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  
  function getPercussion(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("H8:H11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  
  function getMisc(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("I8:I11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  
  function getMusic(){
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("D8:D11").getValues();
  
    var vocals = [];
    for (var row = 0; row < data.length; row++) {
      var rowData = data[row];
      if (rowData[0] !== "") {
      vocals.push(rowData[0]);
      }
    }
    return vocals;
  }
  function getNextDayOfWeek(dayOfWeek) {
      // Code to check that date and dayOfWeek are valid left as an exercise ;)
      date = Date();
      var resultDate = new Date();
  
      resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  
      return resultDate;
  
  }
  
  function getCurrentDate(){
    const date1 = new Date();
    let day = date1.getDate();
    let month = date1.getMonth() + 1;
    let year = date1.getFullYear();
  
    let currentDate = `${month}/${day}/${year}`;
    const currentDate1 = new Date(currentDate);
    return currentDate1;
  }
  
  
  function getNextThursdayDate() {
    const currentDate = new Date();
    const daysUntilNextThursday = (4 - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilNextThursday);
  
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  
  
  
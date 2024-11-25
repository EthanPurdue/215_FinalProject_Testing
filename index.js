// start off hiding activity history box, if user wants to see it they can toggle it on with button
let showActivity = false;
const startUp = () => {
  // we need to wait to hide activity container until everything is ready, hence why it's within a function we do once document is ready
  $(".activityContainer").hide();
};

// create a function whose purpose is to get the current array of cars
const getCars = () => {
  return cars;
};

// Because of the filtering functionality I cannot use "array" when trying to read object info in readContent
//  Instead I will have to read from the filtered array. However If "filteredCars" is equal to "array" unless filtered,
//    then I can use same readContent function regardless of if car is part of filtered array or not
let array = getCars();
let filteredCars = array;

// get all current cars and display them
const loadCars = () => {
  // when calling upon loadCars it may be as result of another function that changed ".carsWrapper" styling
  //  so make sure that all styling is reset to default first
  $(".carsWrapper").html(" ");
  $(".carsWrapper").css("border-radius", "5%");
  $(".carsWrapper").css("margin-left", "9%");
  $(".carsWrapper").css("width", "80%");
  $(".carsWrapper").css("flex-direction", "row");

  // create variable tied to carsWrapper class that contains everything so its easier to append to later
  let carsWrapper = $(".carsWrapper");

  // This is here in the case that the user deletes every single car. Here because carsWrapper has to be declared first-
  // If user creates a car this will go away
  if (cars.length == 0) {
    carsWrapper.append(`There are no cars`);
  }

  // before iterating through our cars create index variable that will be used to track, increments at the end
  let carIndex = 0;

  // iterates through all cars and makes special container for each
  array.forEach((car) => {
    // carCard will contain ALL relevant car information that will be appended to it at end of iteration
    let carCard = $(`<div class = "carCard"></div>`);

    // nameLine contains the make and model or 'name' of the car
    let nameLine = $(`<div class = "nameLine" style = "text-align: center;">
            ${car.carMake} ${car.carModel}
        </div>`);

    // carImage contains the image for the type of car
    //  image based off type of car (ie: luxury, sedan, suv, etc) so that created entries may have an image too
    //  I use a generic silhouette image so that it can be applied to all entries
    let carImage = $(`<div class = "carImage">
            <img src="./images/${car.carType}.jpg" alt="${car.carType}"/>
        </div>`);

    // buttonBar contains the buttons for reading, updating, and deleting
    let buttonBar =
      $(`<div class = "buttonBar">
            <button class = "readCar" id = ${carIndex}>Read</button>
            <button class = "updateCar" id = ${carIndex}>Update</button>
            <button class = "deleteCar" id = ${carIndex}>Delete</button>
            </div>`);

    // will be updated to have info with "Read" button that activates ReadContent function
    let infoBar = $(`<div class = "infoBar"></div>`);

    // end of iteration, append all stuff to the card in the order I want it to appear
    carCard.append(nameLine);
    carCard.append(carImage);
    carCard.append(buttonBar);
    carCard.append(infoBar);
    carsWrapper.append(carCard);

    // carsWrapper is already put within parentContainer in html document so I don't think I need this, but comment in case there's issues
    // $(".parentContainer").append(carsWrapper);

    carIndex++;
  });

  // create a mouseover mouseout for each car card that has an additional effect after delay
  $(".carCard").on("mouseover", function () {
    $(this).css("border-top-left-radius", "22%")
    $(this).css("border-bottom-right-radius", "22%");
    $(this).css("border-top-right-radius", "0%")
    $(this).css("border-bottom-left-radius", "0%");
    $(this).find(".carImage img").css("border-radius", "100%")
    setTimeout(() => {
      $(this).find(".carImage img").css("border-top-right-radius", "100px")
      $(this).find(".carImage img").css("border-bottom-left-radius", "100px")      
    }, 1000); 

  });
  $(".carCard").on("mouseout", function () {
    $(this).css("border-top-left-radius", "0%")
    $(this).css("border-bottom-right-radius", "0%");
    $(this).css("border-top-right-radius", "22%")
    $(this).css("border-bottom-left-radius", "22%");
    $(this).find(".carImage img").css("border-radius", "0%")
    $(this).find(".carImage img").css("border-top-right-radius", "22%")
    $(this).find(".carImage img").css("border-bottom-left-radius", "22%")
  });
  
  // create a mouse over/mouse out event for read, update, delete buttons within "buttonBar" div
  $("button").on("mouseover", function () {
    $(this).css("background-color", "#bebebe");
    $(this).css("box-shadow", "3px 3px 3px #fc2e20");
    $(this).css("width", "120px");
    $(this).css("height", "40px");
    $(this).css("margin-left", "17px");
    $(this).css("margin-right", "18px");
  });
  $("button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "135px");
    $(this).css("height", "50px");
    $(this).css("margin", "10px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // create the mouse over and mouseout functions for the buttons specifically in nav bar
  $(".navbar button").on("mouseover", function () {
    $(this).css("background-color", "#bebebe");
    $(this).css("box-shadow", "3px 3px 3px #fc2e20");
    $(this).css("width", "130px");
    $(this).css("height", "35px");
    $(this).css("margin-left", "20px");
    $(this).css("margin-right", "20px");
  });
  $(".navbar button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "150px");
    $(this).css("height", "40px");
    $(this).css("margin", "10px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // When "Read" button is clicked, update "infoBar" to contain informaiton about the car
  $(".readCar").on("click", readContent);

  // When "Update" button is clicked, bring up box with text fields and drop down with "submit" button to change information
  $(".updateCar").on("click", updateContent);

  // When "delete" button is clicked, delete corresponding car from array and (if I can make it work) animate loading before refreshing
  $(".deleteCar").on("click", deleteContent);
};


const createContent = () => {
  // console commands to keep track of index we will use later
  console.log(`Now carrying out the 'createContent' function`);

  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "33%");
  $(".carsWrapper").css("width", "30%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make a series of fields for users to input values into to update, essentially copy and paste with exception for drop down list
  let userCarMake = $(`<div class = "userCarMake">
        <br>
        <label for="id_CarMake"> Car Make: </label>
        <input type="text" id="CarMake" size="20"/>
    </div>`);

  let userCarModel = $(`<div class = "userCarModel">
        <br>
        <label for="id_CarModel"> Car Model: </label>
        <input type="text" id="CarModel" size="20"/> 
    </div>`);

  // Add drop down list for the type of car. This is a drop down so that a very specific input can be used
  //  this input will determine the image that is used
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
        </select>
    </div>`);

  let userCarColor = $(`<div class = "userCarColor">
        <br>
        <label for="id_CarColor"> Car Color: </label>
        <input type="text" id="CarColor" size="20"/> 
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="number" id="CarYear" size="20"/>    
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="number" id="CarMiles" size="20"/>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="number" id="CarPrice" size="20"/>
    </div>`);

  let userSubmitButton = $(
    `<button class = "userSubmitButton" id = "createButton">Create</button>`
  );

  let userBackButton = $(
    `<button class = "userSubmitButton" id = "backButton" onclick = "loadCars()">Cancel</button>`
  );

  carsWrapper.append(userCarMake);
  carsWrapper.append(userCarModel);
  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarColor);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);
  carsWrapper.append(userBackButton);

  $("button").on("mouseover", function () {
    $(this).css("background-color", "#bebebe");
    $(this).css("box-shadow", "3px 3px 3px #fc2e20");
    $(this).css("width", "155px");
    $(this).css("height", "30px");
    $(this).css("margin-top", "20px");
    $(this).css("margin-left", "17px");
    $(this).css("margin-right", "18px");
  });
  $("button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "165px");
    $(this).css("height", "35px");
    $(this).css("margin", "15px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // another function I am choosing to make anonymous for efficiency sake and it's not very big
  $("#createButton").on("click", () => {
    // make variable for the object that will be pushed, containing all information user had
    let userSubmittedCar = {
      carMake: $("#CarMake").val(),
      carModel: $("#CarModel").val(),
      carType: $("#typeID").val(),
      carColor: $("#CarColor").val(),
      carYear: $("#CarYear").val(),
      carMiles: $("#CarMiles").val(),
      carPrice: $("#CarPrice").val(),
    };

    // log the object
    console.log(userSubmittedCar);

    // push the created car to the cars array before checking to see if it worked
    array.push(userSubmittedCar);
    console.log(array[cars.length - 1]);

    // update the user activity box to show what they user has done
    let userActivity = `<div class = "userActivity"> 
            Added ${userSubmittedCar.carColor} ${userSubmittedCar.carYear} ${userSubmittedCar.carMake} ${userSubmittedCar.carModel}<br>
        </div>`;
      $(".listItems").prepend(userActivity);

    // refresh the page
    loadCars();
  });
};

// Read out relevant information for the specific car
const readContent = (event) => {
  // series of logs to claify that we are in function and what we are doing
  console.log(`Now carrying out the 'readContent' function`);
  index = event.target.id;
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are working with the ${filteredCars[index].carMake} ${filteredCars[index].carModel}`
  );

  // set what the text content is going to be, use the imported index to ensure correct car info is used, then log
  // at the end after a line break we also add a close button
  infoBarContent = `<div class = "infoBarContent" style="font-size: x-large;">
    This ${filteredCars[index].carYear} ${filteredCars[index].carMake} ${filteredCars[index].carModel} is a ${filteredCars[index].carColor} ${filteredCars[index].carType} with ${filteredCars[index].carMiles} miles on it, for a price of $${filteredCars[index].carPrice}. 
    <br> <br>
    <button class = "close" style = margin-left: 0px; margin-right: 0px;>Close</button>`;
  console.log(infoBarContent);

  // Every carCard has a ".moreInfo" div, we need to make sure we're appending to the right one
  // we know that something jQuery does is automatically assign an index to objects created using it
  // so we can make variable equal to the ".infoBar" div that has an index equal to the index we used for car info
  let correspondingDiv = $(".infoBar:eq(" + index + ")");

  let missingContentWarning =
    $(`<div class="noContentWarning" style="font-size: large; text-align: center;">
    There is missing info that needs to be updated! <br>
  </div>`);

  // if there is any missing information at all we will append the missing content warning before the info, otherwise it only shows info
  if (
    !filteredCars[index].carYear ||
    !filteredCars[index].carMake ||
    !filteredCars[index].carModel ||
    !filteredCars[index].carColor ||
    !filteredCars[index].carType ||
    !filteredCars[index].carMiles ||
    !filteredCars[index].carPrice
  ) {
    correspondingDiv.html(missingContentWarning);
    correspondingDiv.append(infoBarContent);
  } else {
    // once we have locked onto the correct one, we can append the text content to it
    correspondingDiv.html(infoBarContent);
  }

  // when the close button is clicked, we will "close" the information by using .html set to empty
  // use anonymous function since it's very quick and easy
  // only want to close respective box, if only there was some variable beforehand that determined how to find it...
  $(".close").on("click", () => {
    $(correspondingDiv).html(" ");
  });
};

//Update the content of the car that was clicked
const updateContent = (event) => {
  // console commands to keep track of index we will use later
  console.log(`Now carrying out the 'updateContent' function`);
  index = event.target.id;
  index = parseInt(index);
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are updating the ${array[index].carMake} ${array[index].carModel}`
  );

  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "33%");
  $(".carsWrapper").css("width", "30%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make a series of fields for users to input values into to update, essentially copy and paste with exception for drop down list
  let userCarMake = $(`<div class = "userCarMake">
        <br>
        <label for="id_CarMake"> Car Make: </label>
        <input type="text" id="CarMake" size="20" value="${array[index].carMake}"/>
    </div>`);

  let userCarModel = $(`<div class = "userCarModel">
        <br>
        <label for="id_CarModel"> Car Model: </label>
        <input type="text" id="CarModel" size="20" value="${array[index].carModel}"/> 
    </div>`);

  // Add drop down list for the type of car. This is a drop down so that a very specific input can be used
  //  this input will determine the image that is used
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
        </select>
    </div>`);

  // This one I needed help to make and looked up, I don't think we learned specifically in class
  //  not at all vital to the function it just bothered me that only car type didn't take existing value
  carTypeList.find(`#typeID`).val(array[index].carType);

  // Optionally log again to verify if the value was correctly set
  console.log("Selected car type: " + $("#typeID").val());

  let userCarColor = $(`<div class = "userCarColor">
        <br>
        <label for="id_CarColor"> Car Color: </label>
        <input type="text" id="CarColor" size="20" value="${array[index].carColor}"/> 
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="text" id="CarYear" size="20" value="${array[index].carYear}"/>    
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="text" id="CarMiles" size="20" value="${array[index].carMiles}"/>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="text" id="CarPrice" size="20" value="${array[index].carPrice}"/>
    </div>`);

  let userSubmitButton = $(
    `<button class = "userSubmitButton" id = "updateButton">Update</button>`
  );

  let userBackButton = $(
    `<button class = "userSubmitButton" id = "backButton" onclick = "loadCars()">Cancel</button>`
  );

  // append all the divs that will house user inputs to carsWrapper
  carsWrapper.append(userCarMake);
  carsWrapper.append(userCarModel);
  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarColor);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);
  carsWrapper.append(userBackButton);

  //hover effect for submit button
  $("button").on("mouseover", function () {
    $(this).css("background-color", "#bebebe");
    $(this).css("box-shadow", "3px 3px 3px #fc2e20");
    $(this).css("width", "155px");
    $(this).css("height", "30px");
    $(this).css("margin-top", "20px");
    $(this).css("margin-left", "17px");
    $(this).css("margin-right", "18px");
  });
  $("button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "165px");
    $(this).css("height", "35px");
    $(this).css("margin", "15px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // another function I am choosing to make anonymous for efficiency sake and it's not very big
  $("#updateButton").on("click", () => {
    array[index].carMake = $("#CarMake").val();
    array[index].carModel = $("#CarModel").val();
    array[index].carType = $("#typeID").val();
    array[index].carColor = $("#CarColor").val();
    array[index].carYear = $("#CarYear").val();
    array[index].carMiles = $("#CarMiles").val();
    array[index].carPrice = $("#CarPrice").val();

    let userActivity = `<div class = "userActivity"> 
      Updated ${array[index].carColor} ${array[index].carYear} ${array[index].carMake} ${array[index].carModel}<br>
    </div>`;
    $(".listItems").prepend(userActivity);

    // now we just have to refresh the content so call upon loadCars function
    loadCars();
  });
};

//Delete the car that is clicked
const deleteContent = (event) => {
  // console commands to keep track of index we will use later to delete car
  console.log(`Now carrying out the 'deleteContent' function`);
  index = event.target.id;
  index = parseInt(index);
  console.log(`The index we are working with is ${index}`);
  console.log(
    `We are deleting the ${array[index].carMake} ${array[index].carModel}`
  );

  let userActivity = `<div class = "userActivity"> 
    Deleted ${array[index].carColor} ${array[index].carYear} ${array[index].carMake} ${array[index].carModel} <br>
  </div>`;
  $(".listItems").prepend(userActivity);

  // actual deleting part
  array.splice(index, 1);

  // 'reload' cars
  loadCars();
};

// function that activates whenever user presses button to toggle activity
const toggleUserActivity = () => {
  // Did this same toggle feature in my chocolate lab assignment, so familiar with it.
  console.log(`now in user activity function`);
  if (showActivity) {
    showActivity = false;
    $(".activityContainer").hide();
    console.log("showing user activity is now " + showActivity);
  } else if (!showActivity) {
    showActivity = true;
    $(".activityContainer").show();
    console.log("showing user activity is now " + showActivity);
  }
};

const filterContent = () => {
  // idea of filtering is that we start with showing Everything and only cut down if specified
  // create array we will populate later
  // obligatory console command
  console.log(`Now carrying out the 'filterContent' function`);
  filteredCars = [];
  // update some of the styling and clear the content of ".carsWrapper "
  $(".carsWrapper").css("border-radius", "10%");
  $(".carsWrapper").css("margin-left", "25%");
  $(".carsWrapper").css("width", "50%");
  $(".carsWrapper").css("flex-direction", "column");
  $(".carsWrapper").html(" ");

  // define carsWrapper like we did in the loadCars function
  let carsWrapper = $(".carsWrapper");

  // make another series of boxes akin to other functions, but this time every input will have drop down
  // had an issue for a while where inputs wouldn't actually filter and used console to figure out inputs counted as strings
  //    rather than numbers despite believing I had parsed them correctly. I found out I can allow ONLY numbers to be type
  let carTypeList = $(`<div class = "carTypeList">
        <br>
        <label for = "carTypes">Car Type</label>
        <select name = "carTypes" id = "typeID">
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option selected value="All">All</option>
        </select>
    </div>`);

  let userCarYear = $(`<div class = "userCarYear">
        <br>
        <label for="id_CarYear"> Car Year: </label>
        <input type="number" id="CarYear" size="20"/> 
        <select name = "year" id = "yearID">
            <option value="exact">Exactly</option>
            <option value="and before">And Earlier</option>
            <option value="and later">And Later</option>
        </select>   
    </div>`);

  let userCarMiles = $(`<div class = "userCarMiles">
        <br>
        <label for="id_CarMiles"> Car Miles: </label>
        <input type="number" id="CarMiles" size="20"/>
        <select name = "miles" id = "milesID">
            <option value="and below">And Below</option>
            <option value="and above">And Above</option>
        </select>
    </div>`);

  let userCarPrice = $(`<div class = "userCarPrice">
        <br>
        <label for="id_CarPrice"> Car Price: </label>
        <input type="number" id="CarPrice" size="20"/>
        <select name = "price" id = "priceID">
            <option value="and below">And Below</option>
            <option value="and above">And Above</option>
        </select>
    </div>`);

  let userSubmitButton = $(
    `<button class = "userSubmitButton" id = "filterButton">Filter</button>`
  );

  let userBackButton = $(
    `<button class = "userSubmitButton" id = "backButton" onclick = "loadCars()">Cancel</button>`
  );

  // append drop down list and text fields for user so they show up
  carsWrapper.append(carTypeList);
  carsWrapper.append(userCarYear);
  carsWrapper.append(userCarMiles);
  carsWrapper.append(userCarPrice);
  carsWrapper.append(userSubmitButton);
  carsWrapper.append(userBackButton);


  // hover effect for filter button
  $("button").on("mouseover", function () {
    $(this).css("background-color", "#bebebe");
    $(this).css("box-shadow", "3px 3px 3px #fc2e20");
    $(this).css("width", "155px");
    $(this).css("height", "30px");
    $(this).css("margin-top", "20px");
    $(this).css("margin-left", "17px");
    $(this).css("margin-right", "18px");
  });
  $("button").on("mouseout", function () {
    $(this).css("box-shadow", "");
    $(this).css("width", "165px");
    $(this).css("height", "35px");
    $(this).css("margin", "15px");
    $(this).css("background-color", "");
    $(this).css("color", " ");
  });

  // will make filter an anonymous function within scope of "filterContent()" so I can easily access everything

  // when filter button is clicked use user inputs to do the actual filtering
  $("#filterButton").on("click", () => {
    // every time we click filter want to clear what is currently in array
    filteredCars = [];
    // if all checks are true then add car to array, set to true at beginning of each loop iteration later
    let typeCheck = true;
    let yearCheck = true;
    let milesCheck = true;
    let priceCheck = true;
    // parse every text field to be integers so that they can be numerically compared, otherwise they will be considered strings
    let userSubmittedYear = $("#CarYear").val();
    userSubmittedYear = parseInt(userSubmittedYear);
    console.log(typeof userSubmittedYear);
    let userSubmittedMiles = $("#CarMiles").val();
    userSubmittedMiles = parseInt(userSubmittedMiles);
    console.log(typeof userSubmittedMiles);
    let userSubmittedPrice = $("#CarPrice").val();
    userSubmittedPrice = parseInt(userSubmittedPrice);
    console.log(typeof userSubmittedPrice);

    // do a forEach that checks every car, and only pushes them to new temp array if they qualify for EVERY check
    array.forEach((car) => {
      let typeCheck = true;
      let yearCheck = true;
      let milesCheck = true;
      let priceCheck = true;
      // every check will only be looked into if user input is reasonable, if there's any negatives etc, just leave it true
      // better to include a car when weird input vs not

      // if user wants ALL then leave it true because that way it will be true for every car
      if ($("#typeID").val() != "All") {
        typeCheck = car.carType == $("#typeID").val();
      }

      // if user's year is not negative, go through the if statement
      // yearCheck will be true if it satisfies requirement user wants (car to be exact, before or after year) otherwise its false
      if (userSubmittedYear > 0) {
        if ($("#yearID").val() == "exact") {
          yearCheck = car.carYear == userSubmittedYear;
        } else if ($("#yearID").val() == "and before") {
          yearCheck = car.carYear <= userSubmittedYear;
        } else if ($("#yearID").val() == "and later") {
          yearCheck = car.carYear >= userSubmittedYear;
        }
      }

      // if user miles are not negative, go forward with if statement
      // milesCheck will be true if car miles amount falls under what user wants (above or below their number)
      if (userSubmittedMiles > 0) {
        if ($("#milesID").val() == "and below") {
          milesCheck = car.carMiles <= userSubmittedMiles;
        } else if ($("#milesID").val() == "and above") {
          milesCheck = car.carMiles >= userSubmittedMiles;
        }
      }

      // if user submitted price is not negative do the if loop
      //  priceCheck will be true if car price falls under what the user wants
      if (userSubmittedPrice > 0) {
        if ($("#priceID").val() == "and below") {
          priceCheck = car.carPrice <= userSubmittedPrice;
        } else if ($("#priceID").val() == "and above") {
          priceCheck = car.carPrice >= userSubmittedPrice;
        }
      }

      // if EVERY check is true, push the car to the array
      if (typeCheck && yearCheck && milesCheck && priceCheck) {
        filteredCars.push(car);
        console.log(`${car.carMake} ${car.carModel} was added`);
      }
    });
    console.log(filteredCars);

    // update user activity history
    let userActivity = `<div class = "userActivity"> 
      filtered for a year ${userSubmittedYear} ${$("#yearID").val()} for ${$(
      "#typeID"
    ).val()}, with ${userSubmittedMiles} ${$(
      "#milesID"
    ).val()} miles, at a cost of ${userSubmittedPrice} ${$("#priceID").val()}
    </div>`;
    $(".listItems").prepend(userActivity);
    // use qualifying cars array as parameter for function to display them
    displayFilteredCars(filteredCars);
  });
};

const displayFilteredCars = (filteredCars) => {
  let carsWrapper = $(".carsWrapper");

  $(".carsWrapper").html(" ");
  $(".carsWrapper").css("border-radius", "5%");
  $(".carsWrapper").css("margin-left", "9%");
  $(".carsWrapper").css("width", "80%");
  $(".carsWrapper").css("flex-direction", "row");

  // if the length of the array is greater than 0 we do everything we're about to do
  //  if it's not, there is an else at the end where we append a message saying "no cars"
  if (filteredCars.length > 0) {
    let carIndex = 0;
    // this forEach is very similar to what we did to initially create, only notable change is array we draw from
    filteredCars.forEach((car) => {
      // Do if filtered cars.length =0 then display div or info saying nothing here, consider putting after everything

      // carCard will contain ALL relevant car information that will be appended to it at end of iteration
      let carCard = $(`<div class = "carCard"></div>`);

      // nameLine contains the make and model or 'name' of the car
      let nameLine = $(`<div class = "nameLine">
            ${car.carMake} ${car.carModel}
        </div>`);

      // carImage contains the image for the type of car
      //  image based off type of car (ie: luxury, sedan, suv, etc) so that created entries may have an image too
      //  I use a generic silhouette image so that it can be applied to all entries
      let carImage = $(`<div class = "carImage">
            <img src="./images/${car.carType}.jpg" alt="${car.carType}"/>
        </div>`);

      // buttonBar contains the buttons for reading, updating, and deleting
      let buttonBar = $(`<div class = "buttonBar">
            <button class = "readCar" id = ${carIndex}>Read</button>
            <button class = "goBack" id = ${carIndex}>Return</button>
            </div>`);

      // will be updated to have info with "Read" button that activates ReadContent function
      let infoBar = $(`<div class = "infoBar"></div>`);

      // end of iteration, append all stuff to the card in the order I want it to appear
      carCard.append(nameLine);
      carCard.append(carImage);
      carCard.append(buttonBar);
      carCard.append(infoBar);
      carsWrapper.append(carCard);

      carIndex++;
    });

      // create a mouseover mouseout for each car card that has an additional effect after delay
    $(".carCard").on("mouseover", function () {
      $(this).css("border-top-left-radius", "22%")
      $(this).css("border-bottom-right-radius", "22%");
      $(this).css("border-top-right-radius", "0%")
      $(this).css("border-bottom-left-radius", "0%");
      $(this).find(".carImage img").css("border-radius", "100%")
      setTimeout(() => {
        $(this).find(".carImage img").css("border-top-right-radius", "100px")
        $(this).find(".carImage img").css("border-bottom-left-radius", "100px")      
      }, 1000); 

    });
    $(".carCard").on("mouseout", function () {
      $(this).css("border-top-left-radius", "0%")
      $(this).css("border-bottom-right-radius", "0%");
      $(this).css("border-top-right-radius", "22%")
      $(this).css("border-bottom-left-radius", "22%");
      $(this).find(".carImage img").css("border-radius", "0%")
      $(this).find(".carImage img").css("border-top-right-radius", "22%")
      $(this).find(".carImage img").css("border-bottom-left-radius", "22%")
    });
    
    // create a mouse over/mouse out event for buttons div
    $("button").on("mouseover", function () {
      $(this).css("background-color", "#bebebe");
      $(this).css("box-shadow", "3px 3px 3px #fc2e20");
      $(this).css("width", "120px");
      $(this).css("height", "40px");
      $(this).css("margin-left", "17px");
      $(this).css("margin-right", "18px");
    });
    $("button").on("mouseout", function () {
      $(this).css("box-shadow", "");
      $(this).css("width", "135px");
      $(this).css("height", "50px");
      $(this).css("margin", "10px");
      $(this).css("background-color", "");
      $(this).css("color", " ");
    });

    // create the mouse over and mouseout functions for the buttons specifically in nav bar (again)
    $(".navbar button").on("mouseover", function () {
      $(this).css("background-color", "#bebebe");
      $(this).css("box-shadow", "3px 3px 3px #fc2e20");
      $(this).css("width", "130px");
      $(this).css("height", "35px");
      $(this).css("margin-left", "20px");
      $(this).css("margin-right", "20px");
    });
    $(".navbar button").on("mouseout", function () {
      $(this).css("box-shadow", "");
      $(this).css("width", "150px");
      $(this).css("height", "40px");
      $(this).css("margin", "10px");
      $(this).css("background-color", "");
      $(this).css("color", " ");
    });

    // When "Read" button is clicked, update "infoBar" to contain informaiton about the car
    $(".readCar").on("click", readContent);

    // When "Update" button is clicked, bring up box with text fields and drop down with "submit" button to change information
    $(".goBack").on("click", loadCars);
  } else {
    // if no results then as I said before we tell user as much, offering a button to return
    carsWrapper.append(`There are no results`);
    carsWrapper.append(
      `<button class = "userSubmitButton" id = "backButton">Return</button>`
    );

    $("#backButton").on("click", loadCars);
  }
};

// when document is ready we want to hide activity history as a one time thing
//  if I were to put it in loadCars then everytime someone goes back to the menus it would be hidden
$(document).ready(startUp);
// by starting loadCars we are allowing everything to happen either as a part of it or a function resulting from it
$(document).ready(loadCars);

# **Zoho Leads Module Testing**
## **Overview**
*This Repositroy contains the automated tests for the Zoho leads Module. The tests cover the functionalities creating a lead, filtering the lead, editing the existing lead, and deleting leads.
The test are implememted using playwright with typescript*

### **Table of contents**
- Features
- Setup
- Running the Tests
- Folder structure
- Test cases
1. Features: Create a New Lead: Automates the process of creating a new lead with various attributes
2. Filter Leads by Email: Verifies that filtering leads by email works correctly.
3. Edit a Lead: Tests the ability to edit existing lead information.
4. Delete a Lead: Ensures that leads can be deleted and verifies that the deletion is successful.

### ***Setup***
#### ***Prerequisites*** ####
- Node.js: Ensure you have Node.js installed. [Download node.js](https://nodejs.org/en/download/package-manager)
- Playwright: Install Playwright and its dependencies.```npx install playwright```
- Faker.js: Install faker.js to fill the forms with random testable data. ```npm install faker.js```
#### ***Installation*** ###
- ```npx playwright install```
- ```npm install typescript --save-dev``` Ensure typescript is installed and properly configured
- ```npx tsc --init``` Genenrate a tsconfig.json file for typescript configuration

### ***Folder Structure*** ###

- **`src/`**: Contains source code and test files.
- - **`tests/`**: Contains test files.
    - **`LeadModule.spec.ts`**: Playwright tests for the Zoho Leads module.
  - **`utils/`**: Utility functions and configuration files.
    - **`config.ts`**: Configuration settings and URLs.
    - **`fakerData.ts`**: Functions to generate test data using Faker.js.
    - **`login.ts`**: Login functions and utilities.
    - **`testData.ts`**: Functions to read and write test data.
  - **`test-data.json`**: includes the test data in json format (here the email for the lead we are storing)
- **``test-results`** this is will store the results after each test execution 
- **`package.json`**: contains the dependencies 
- **`playwright.config.ts`**: Configuration file for Playwright.
- **`README.md`**: This file.

### *Test Cases* ###
#### *Test case ID TC001* ####
- ##### Description: Verify the process of adding a new lead.
- Precondition: User must be logged in and on the Leads page.
 - Test Steps:
1. Navigate to the Leads page.
2. Click on the "Create Lead" button.
3. Fill in the lead details.
4. Click the "Save" button.
#### Expected Result: The new lead should be created and visible in the leads list.

#### *Test case ID TC002* ####
- ##### Description: Filter the existing lead by email.
- Precondition:  lead should be created and available on the user leads dahsboard
- Test steps:
1. Navigate to the leads page
2. click on the email filter radio button
3. paste the email that is created from the test data
4. click on Apply filter CTA
#### Expected result: User will see the appplied filter lead on the leads dahsboard


#### *Test case ID TC003* ####
- ##### Description: Edit a existing lead
- Precondition : lead should be created and available on the user leads dahsboard
- Test Steps:
1. Navigate to the Leads Page
2. click on the email filter radio icon
3. paste the email that is created from the test data AND apply the filter
4. Now click on the lead to get to the lead details page
5. click on the Edit CTA
6. Edit the company name or any
7. click on save
#### Expected result: The leads should be edited 

#### *Test case ID TC004* ####
- ##### Description: Delete a existing lead
- Preconditions: lead should be created and available on the user leads dahsboard
- Test steps:
1. Navigate to the leads page
2. Apply the eamil filter of the generated lead
3. click on the lead
4. now click on the options to get the delete from the list
5. click on delete CTA from the POP-UP

#### Expected Result: The lead should be deleted


## Test-Approach ##
- To automate these four functional test first i created the test sceanrio. Then in the very first functional test there is form where it needs lot of fake data to fill and it should be testable so i though of installing and importing the [faker.js](https://fakerjs.dev/api/location.html#street)
- Then things like cheking the node versions and reinstall the playwright to make sure and the node library
- Now i created `utils` folder under which i have to put the `fakerdata.js` where i put all the data variables to this folder which i am going to use it in the cresting leads form
- Then under the `config.ts` i put the url variables whick i am going to call in the test script this not only allow me to modify the user data or urls in single click but also increste the maintainablity (for instance the zoho crm web app allowign me for a single user to login only 20 times a day but i crested multiple accounts and just adjusted the `config.ts` file accordingly and yo its works
- under `utils` folder i created another file that is `login.ts` where i wrote the function to login
- then under the `utils` i crested a folder `testdata.ts` where i declared the path where the `testdata.json` is located and reading it
- `playwright.config.ts` under this declared things like the navigation timeout, whether the test is going to be in the headless or not, the browser instance and the usage mode,the test reports
- `LeadModule.spec.ts`this is the test file where i scripted all the 4 test cases. firstly imported all the modules to the file then scripted interacting with the locators and expected assertions after end of the each test scripts
  


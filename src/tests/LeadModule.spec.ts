import { test, expect } from '@playwright/test'
import { login } from '../utils/login'
import { urls } from '../utils/config'
import { createLeadForm } from '../utils/fakerData'
import { readTestData, writeTestData } from '../utils/testData'
import { faker } from '@faker-js/faker'

test.describe('Leads Module', () => {

//Create a New Lead: Verify the process of adding a new lead.
    test('Create a New Lead', async ({ page }) => {
        // Log in to the application
        await login(page)
        // Navigate to the Leads page
        await page.goto(urls.leads)
        await page.getByRole('link', { name: 'Leads' }).click()
        await page.getByRole('button', { name: 'Create Lead' }).click()
        // Generate lead data using faker.js
        const { Company, firstname, lastname, title, Email, phone, fax, mobile, website, noOfemployees, annual_revenue, skype_id, secondary_email, twitter, street, city, state, zip_code, country, description } = createLeadForm()
         // Function to fill input fields
        async function fillField(selector: string, value: string): Promise<void> {
            await page.locator(selector).fill(value)
        }
        // Fill lead creation form
        await fillField('#Crm_Leads_COMPANY #inputId', Company)
        await fillField('#Crm_Leads_FIRSTNAME_LInput', firstname)
        await fillField('#Crm_Leads_LASTNAME_LInput', lastname)
        await fillField('#Crm_Leads_DESIGNATION_LInput', title)
        await fillField('#Crm_Leads_EMAIL_LInput', Email)
        await fillField('#Crm_Leads_PHONE_LInput', phone)
        await fillField('#Crm_Leads_FAX_LInput', fax)
        await fillField('#Crm_Leads_MOBILE_LInput', mobile)
        await fillField('#Crm_Leads_WEBSITE_LInput', website)
        await fillField('#Crm_Leads_EMPCT_LInput', noOfemployees.toFixed())
        await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight))
        await fillField('#Crm_Leads_ANNUALREVENUE_LInput', annual_revenue.toFixed())
        await fillField('#Crm_Leads_SKYPEIDENTITY_LInput', skype_id)
        await fillField('#Crm_Leads_ADDN_EMAIL_LInput', secondary_email)
        await fillField('#Crm_Leads_TWITTER_LInput', twitter)
        await fillField('#Crm_Leads_LANE_LInput', street)
        await fillField('#Crm_Leads_CITY_LInput', city)
        await fillField('#Crm_Leads_STATE_LInput', state)
        await fillField('#Crm_Leads_CODE_LInput', zip_code)
        await fillField('#Crm_Leads_COUNTRY #inputId', country)
        await fillField('textarea', description)
        // Function to select dropdown options
        async function selectDropdownOption(dropdownSelector: string, optionText: string): Promise<void> {
            const dropdown = page.locator(dropdownSelector)
            await dropdown.waitFor({ state: 'visible' })
            await dropdown.click()
            await page.locator(`text=${optionText}`).click()
        }
        // Select dropdown options in the form
        await selectDropdownOption('#Crm_Leads_STATUS', 'Contact in Future')
        await selectDropdownOption('#Crm_Leads_LEADSOURCE', 'Cold Call')
        await selectDropdownOption('#Crm_Leads_INDUSTRY', 'Data/Telecom OEM')
        await selectDropdownOption('#Crm_Leads_RATING', 'Active')
    
        // Submit the form
        await page.getByRole('button', { name: 'Save', exact: true }).click()
        // Save the created lead data for later use here i am storing the lead_email for further test usablity
        const testData = readTestData()
        testData.lead = { Email }
        writeTestData(testData)
    })
    
    
    
// Test case for filtering the lead by email
test('Filter the lead by email',async ({page}) => {
    await login(page)
    const testData=readTestData()
    const createdLeadEmail=testData.lead.Email
    // Navigate to the Leads page and apply the email filter
    await page.goto(urls.leads)
    await page.getByRole('link',{name:'Leads'}).click()
    await page.click('lyte-checkbox[data-zcqa="Email"] label')
    const emailInputSelector = 'crux-smart-filter-input #Email_crux_comp input[placeholder="Type here"]'
    await page.waitForSelector(emailInputSelector)
    await page.fill(emailInputSelector, createdLeadEmail)
    await page.getByRole('button',{name:'Apply Filter'}).click()
    await page.waitForLoadState('domcontentloaded')
    const filteredLeadSelector = `lyte-text[lt-prop-value="${createdLeadEmail}"]`
    await page.waitForSelector(filteredLeadSelector,{timeout:40000})
    // Verify the filtered lead
    const filteredLeadName = await page.textContent(filteredLeadSelector)
    expect(filteredLeadName).toContain(createdLeadEmail)

})
// Test case for editing the lead
test('Edit the lead',async ({page}) => {
    await login(page)
    const testData=readTestData()
    const createdLeadEmail=testData.lead.Email
    // Navigate to the Leads page and apply the email filter
    await page.goto(urls.leads)
    await page.getByRole('link', { name: 'Leads' }).click()
    await page.waitForSelector('lyte-checkbox[data-zcqa="Email"] label')
    await page.click('lyte-checkbox[data-zcqa="Email"] label')
    const emailInputSelector = 'crux-smart-filter-input #Email_crux_comp input[placeholder="Type here"]'
    await page.waitForSelector(emailInputSelector)
    await page.fill(emailInputSelector, createdLeadEmail)
    await page.getByRole('button', { name: 'Apply Filter' }).click()

    const pageContent = await page.content()
    console.log(pageContent)
    // Verify the filtered lead and click on the row
    const filteredLeadSelector = `lyte-text[lt-prop-value="${createdLeadEmail}"]`
    await page.waitForSelector(filteredLeadSelector, { timeout: 40000 })
    const filteredLeadName = await page.textContent(filteredLeadSelector)
    expect(filteredLeadName).toContain(createdLeadEmail)
    const rowSelector = `lyte-exptable-tr:has(lyte-exptable-td:has-text("${createdLeadEmail}"))`
    await page.waitForSelector(rowSelector)
    await page.click(rowSelector)
    // Edit the lead's company name
    await page.waitForLoadState('networkidle')
    await page.getByRole('button',{name:'Edit'}).click()
    const newCompanyName= faker.company.name()
    const companyInputSelector = '#inputId' 
    await page.fill(companyInputSelector, newCompanyName)
    await page.getByRole('button',{name:'Save',exact:true}).click()
    // Verify the updated company name
    await page.waitForSelector(companyInputSelector)
    const updatedCompanyName = await page.inputValue(companyInputSelector)
    expect(updatedCompanyName).toBe(newCompanyName)
})
// Test case for deleting a lead
test('Delete a lead',async ({page})=>{
    await login(page)
    const testData=readTestData()
    const createdLeadEmail=testData.lead.Email
    // Navigate to the Leads page and apply the email filter
    await page.goto(urls.leads)
    await page.getByRole('link',{name:'Leads'}).click()
    const rowSelector = `lyte-exptable-tr:has(lyte-exptable-td:has-text("${createdLeadEmail}"))`
    await page.waitForSelector(rowSelector)
    await page.click(rowSelector)
    await page.waitForLoadState('networkidle')
    //click on delete button from pop-up
    await page.locator('button.lyte-button.dv_moreBtn.lyteDefaultBtn').click()
    await page.locator('lyte-menu-item').filter({ hasText: 'Delete' }).click()
    await page.locator('button[data-zcqa="PupHome_button_deletebtn"]').click();
    await page.waitForLoadState('networkidle')
    //Go to leads apply the deleted email filter and click to verify the deletion is done 
    await page.goto(urls.leads)
    await page.getByRole('link',{name:'Leads'}).click()
    await page.click('lyte-checkbox[data-zcqa="Email"] label')
    const emailInputSelector = 'crux-smart-filter-input #Email_crux_comp input[placeholder="Type here"]'
    await page.waitForSelector(emailInputSelector)
    await page.fill(emailInputSelector, createdLeadEmail)
    await page.getByRole('button',{name:'Apply Filter'}).click()
    await page.waitForLoadState('domcontentloaded')
    const noLeadsMessageSelector = 'div.cxTableCompNoResults[data-zcqa="lvNoRecordsFound"]'
    await page.waitForSelector(noLeadsMessageSelector, { timeout: 30000 })
    //verofying the no leads status from the UI 
    const noLeadsMessage = await page.textContent(noLeadsMessageSelector)
    expect(noLeadsMessage).toContain('No Leads found')

})
})


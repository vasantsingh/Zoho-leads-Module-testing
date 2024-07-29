import { faker } from "@faker-js/faker"

export function createLeadForm(){
    const Company= faker.company.name()
    const firstname= faker.person.fullName()
    const lastname= faker.person.lastName()
    const title= faker.person.jobTitle()
    const Email= faker.internet.email()
    const phone= faker.phone.number()
    const fax= faker.phone.number()
    const mobile= faker.phone.number()
    const website= faker.internet.url()
    const noOfemployees= faker.number.int({min:50,max:500})
    const annual_revenue= faker.number.int({min: 100000})
    const skype_id= faker.internet.userName()
    const secondary_email= faker.internet.email()
    const twitter= faker.internet.userName()
    const street= faker.location.street()
    const city= faker.location.city()
    const state= faker.location.state()
    const zip_code= faker.location.zipCode()
    const country= faker.location.country()
    const description= faker.lorem.paragraphs()

    return{
        Company,firstname,lastname,title,Email,phone,fax,mobile,website,noOfemployees,annual_revenue,skype_id,secondary_email,twitter,street,city,state,
        zip_code,country,description
    }
}
const puppeteer = require('puppeteer');

async function hasInputGotValidationClass (page, selector) {
    return await page.$eval(selector, (element) => element.classList.contains('input-validation-error'));
}

describe.only('Enquiry Form', async () => {

    let browser;
    let page;

    const ENQUIRY_FORM_URL = 'https://www.plumbs.co.uk/request-a-home-visit/';

    beforeAll(async () => {
         browser = await puppeteer.launch({args: ['--no-sandbox'], headless: false});
         page = await browser.newPage();
    })

    beforeEach(async () => {
        await page.goto(ENQUIRY_FORM_URL, { waitUntil: 'domcontentloaded'});
    });

    afterAll(async () => {
        await browser.close();
    });

    test("can't submit with no fields entered", async (done) => {
        await page.click('#homeVisitButton');

        expect(page.url()).toBe(ENQUIRY_FORM_URL);

        const hasValidationErrorClass = await hasInputGotValidationClass(page, '#FirstName')

        // var inputSelectors = [
        //     "#FirstName"
        // ]

        // inputSelectors.map(() => {

        // })

        expect(hasValidationErrorClass).toBe(true);

        done();
    });
});

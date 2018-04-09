const puppeteer = require('puppeteer');

test('Test test', async () => {

    let browser = await puppeteer.launch();

    let page = await browser.newPage();

    await page.goto('http://example.com/', { waitUntil: 'domcontentloaded'});
    await page.waitForSelector('body div h1');

    const headingText = await page.$eval('body div h1', (element) => element.innerHTML);

    expect(headingText).toBe('Example Domain');

    browser.close();

}, 16000)

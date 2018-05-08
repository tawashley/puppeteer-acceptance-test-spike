const puppeteer = require('puppeteer');

describe('Search journey test', async () => {
    test('Plumbs Search Journey', async (done) => {

        let browser = await puppeteer.launch({args: ['--no-sandbox'], headless: false});

        let page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080
        });

        await page.goto('https://www.plumbs.co.uk/', { waitUntil: 'domcontentloaded'});
        await page.click('#search_toggle', { delay: 250 });

        const searchInput = await page.$('#search_drop_down');
        await searchInput.type('covers', { delay: 250 })
        await searchInput.press('Enter');

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        var searchHeadingText = await page.$eval('h1.red', (element) => element.innerHTML.trim());
        var searchPageTitle = await page.title();

        expect(searchHeadingText).toBe('Search');
        expect(searchPageTitle).toBe('Search | Plumbs');

        await page.click('.search-new li a');

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.main_content_area', {
            visible: true
        });

        browser.close();

        done();
    }, 30000)
})



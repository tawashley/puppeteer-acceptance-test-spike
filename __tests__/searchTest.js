const puppeteer = require('puppeteer');

test('Plumbs Search Journey', async () => {

    let browser = await puppeteer.launch({args: ['--no-sandbox']});

    let page = await browser.newPage();

    await page.setViewport({
        width: 1440,
        height: 900
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

}, 30000)

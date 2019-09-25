import puppeteer from 'puppeteer'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2));

function validateCredentials() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(argv.username).toLowerCase()) && argv.password.length >= 8;
}

async function login(page: puppeteer.Page) {
    let emailHandle : puppeteer.ElementHandle | null;
    let passwordHandle : puppeteer.ElementHandle | null;
    let submitHandle : puppeteer.ElementHandle | null;

    await page.goto('https://dev2.shopmessage.me/shopmessage/login', { waitUntil: 'networkidle2' })
    await page.waitForSelector('button[type="submit"]', {
        visible: true,
    });
    emailHandle = await page.$('input[name="email"]')
    passwordHandle = await page.$('input[name="password"]')
    submitHandle = await page.$('button[type="submit"]')

    if (emailHandle === null || passwordHandle === null || submitHandle === null) return

    await emailHandle.type(argv.username)
    await passwordHandle.type(argv.password)

    await page.screenshot({path: './screenshots/login.png'})
    await Promise.all([
        submitHandle.click(),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    await page.screenshot({path: './screenshots/submit.png'})
}

async function goToDashboard(page: puppeteer.Page, url: string, id: string) {
    await page.goto(url, { waitUntil: 'networkidle2' })
    await page.waitForSelector(`a[href="/${id}/dashboard/overview/plugins"] span`, {
        visible: true,
    });
    await page.screenshot({path: './screenshots/dashboard.png'})
}

async function navigateGrowthPlugins(page: puppeteer.Page, url: string, id: string) {
    let linkHandle : puppeteer.ElementHandle | null;
    linkHandle = await page.$(`a[href="/${id}/dashboard/overview/plugins"]`)
    if (linkHandle === null) return
    await Promise.all([
        linkHandle.click(),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    await page.waitForSelector('button.ant-btn.ant-btn-primary', {
        visible: true,
    });
    await page.screenshot({path: './screenshots/growth_plugins.png'})
    await Promise.all([
        page.click('button.ant-btn.ant-btn-primary'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
}

async function createModal(page: puppeteer.Page) {
    await page.waitForSelector('strong.gp-card-title', {
        visible: true,
    });
    await page.screenshot({path: './screenshots/create_modal.png'})
    await Promise.all([
        page.click('.ant-card.gp-card.ant-card-bordered'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    await page.waitForSelector('.ant-col-8:nth-child(2) .strategyTile.modal img', {
        visible: true,
    });
    await page.screenshot({path: './screenshots/modal_selections.png'})

    await page.click('.ant-col-8:nth-child(2) .strategyTile.modal')
    await page.waitForSelector('.ant-form.ant-form-vertical.ant-form-hide-required-mark input', {
        visible: true,
    });

    const today = new Date()
    const modalTitle = ` - ${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    await page.type('.ant-form.ant-form-vertical.ant-form-hide-required-mark input', modalTitle)
    await page.screenshot({path: './screenshots/modal_naming.png'})
}

if (!validateCredentials()) {
    throw new Error('Invalid Credentials')
}

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await login(page)
    const dashboardUrl = page.url().replace('app', 'dev2').replace('/wizard/connect', '/dashboard')
    const id = dashboardUrl.split('/')[3]
    await goToDashboard(page, dashboardUrl, id)
    await navigateGrowthPlugins(page, dashboardUrl, id)
    await createModal(page)

    await browser.close()
})()
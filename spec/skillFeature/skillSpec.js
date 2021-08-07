const puppeteer = require('puppeteer');
const $ = require('puppeteer-shadow-selector').$;
const paths = 'Extensions/assistant';

describe("Skill Happy Path Testing", () => {
    let browser = null;
    let page = null;
    const EXTENSIONURL = 'chrome-extension://bnlipmjdmieijhpmfpjdeddodafhnpan/assets/options.html#/';

    beforeEach(async () => {
        console.log('==>Open Browser with extension');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        browser = await puppeteer.launch({
            // Disable headless mode for extension 
            headless: false,
            // Pass the options to install the extension
            args: [
                `--disable-extensions-except=${paths}`,
                `--load-extension=${paths}`,
                `--window-size=800,600`,
                '-silent-debugger-extension-api'  //Disabling chrome debugging bar
                ]
        });
        page = await browser.newPage();
        console.log('==>Navigate to Extension');
        await page.goto(EXTENSIONURL);
        await page.evaluate(()=>{
            console.log('==>Opening shadowDOM');
            document.querySelector('#set-e2e-tests-mode').click();
         });

        console.log('==>Installing the skill');
        await page.click('.ant-btn-sm');
        await page.type('.ant-input','http://localhost:8000/skill.zip');
        await page.click('.cttGr');

        
    }, 90000);

    afterEach(async () => {
        console.log('==>Closing Browser');
        await browser.close();
    });

    it("Should display skill launcher window", async () => {
        await page.goto('https://www.w3.org/',{waitUntil: 'networkidle2'});
        const launchPage = await $(page, `mw-assistant-launcher::shadow-dom([class="sc-fHCHSn jRJKPp"])`);
        expect (launchPage).toBeTruthy();
        let expectedValue = await page.evaluate(el => el.textContent, launchPage)
        console.log('==>Text Present: '+launchPage)
    });

    it("Should displays a sidebar with a “Run Automation” button.", async () => {
        await page.goto('https://www.w3.org/',{waitUntil: 'networkidle2'});
        const launchPage = await $(page, `mw-assistant-launcher::shadow-dom([class="sc-fHCHSn jRJKPp"])`);
        await page.waitForTimeout(2000);
        await launchPage.click();
        const runAutomationbtn = await $(page,`mw-assistant-skill::shadow-dom(button)`);
        expect (runAutomationbtn).toBeTruthy();

    });

    it("Should goto  https://google.com/ and fills the Google search bar with the following text “Automation did run!”.", async () => {
        await page.goto('https://www.w3.org/',{waitUntil: 'networkidle2'});
        const launchPage = await $(page, `mw-assistant-launcher::shadow-dom([class="sc-fHCHSn jRJKPp"])`);
        await launchPage.click();
        await page.waitForTimeout(2000);
        const runAutomationbtn = await $(page,`mw-assistant-skill::shadow-dom(button)`);
        await runAutomationbtn.click();
        await page.waitForTimeout(11000);
        const inputText = await page.evaluate( () => document.querySelector('input').value );
        console.log('Search String==>'+inputText)
        expect(inputText).toContain('Automation did run!')
        
        

        
       


    });

    


    
});
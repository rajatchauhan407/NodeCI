const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');
class CustomPage{
    static async build(){
        const browser = await puppeteer.launch(
            {headless: true,
             args:['--no-sandbox']
            }
        );
        const page = await browser.newPage();
        const customPage = new CustomPage(page);
       return new Proxy(customPage,{
            get(target, property){
                return target[property] || browser[property] || page[property] ;
            }
        });
    }
    constructor(page){
        this.page = page;
        // this.browser = browser;
    }
    async login(){
        const user = await userFactory();
    // await page.goto('localhost:3000');
    // const id = '62cfd884586a4a3dee4e0917';

    const {session,sig} = sessionFactory(user);
    
    await this.page.setCookie({name:'session', value:session, domain:'localhost:3000'});
    await this.page.setCookie({name:'session.sig', value:sig, domain:'localhost:3000'});
    await this.page.goto('http://localhost:3000/blogs');
    await this.page.waitFor('a[href="/auth/logout"]');
    }
    async getContentsOf(selector){
        return this.page.$eval(selector, (el)=>{
            return el.innerHTML;
        });
    }
    
    // close(){
    //     this.browser.close();
    // }
}
module.exports = CustomPage;
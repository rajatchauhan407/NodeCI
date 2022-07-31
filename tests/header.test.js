
const Page = require('./helpers/page');


let page;
beforeEach(async ()=>{
    jest.setTimeout(60000);
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async ()=>{
   await page.close();
});
// afterAll(async()=>{
//     await page.close();
// });
test("header has the correct test", async()=>{
    await page.login(); 
    // await page.goto('localhost:3000');
    const text = await page.$eval('a.brand-logo',(el)=>{
      return el.innerHTML
    });
    expect(text).toEqual('Blogster');
});

test('clicking login starts auth flow', async()=>{
    // await page.goto('localhost:3000');
    
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});
test('when signed in, shows logout button', async ()=>{
    
    await page.login();
    // const text = await page.$eval('a[href="/auth/logout"]',(el)=>{
    //     return el.innerHTML;
    // });
    let text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
});
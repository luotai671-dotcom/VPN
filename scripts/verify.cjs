const path=require('node:path');
let playwright;
try {playwright=require('playwright');} catch {playwright=require(path.join(require('node:os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const {chromium}=playwright;
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000');
 await page.locator('.vpn-card').first().waitFor();
 assert.equal(await page.locator('.vpn-card').count(),5);
 fs.mkdirSync('artifacts',{recursive:true});
 await page.screenshot({path:'artifacts/desktop.png',fullPage:true});
 for(const [filter,count] of [['streaming',3],['gaming',3],['privacy',3],['budget',2],['all',5]]){
  await page.locator(`[data-filter="${filter}"]`).click();
  assert.equal(await page.locator('.vpn-card').count(),count);
 }
 await page.locator('.details-toggle').first().click();
 assert.equal(await page.locator('#details-nordvpn').isVisible(),true);
 await page.locator('.details-toggle').first().click();
 assert.equal(await page.locator('#details-nordvpn').isVisible(),false);
 await page.locator('.search-trigger').click();
 await page.locator('#search-input').fill('Nord');
 assert.equal(await page.locator('.search-result').count(),1);
 await page.locator('#search-input').fill('<img src=x onerror=alert(1)>');
 assert.equal(await page.locator('#search-results img').count(),0);
 await page.keyboard.press('Escape');
 await page.locator('#search-dialog').waitFor({state:'hidden'});
 assert.equal(await page.locator('#search-dialog').isVisible(),false);
 await page.locator('[data-info]').click();
 assert.equal(await page.locator('#info-dialog').isVisible(),true);
 await page.keyboard.press('Escape');
 await page.locator('#email').fill('demo@example.com');
 await page.locator('#newsletter-form button').click();
 assert.match(await page.locator('#newsletter-message').textContent(),/未保存邮箱/);
 const internal=await page.locator('a[href^="?"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
 for(const href of internal){await page.goto('http://localhost:3000/'+href);assert.equal(await page.locator('#detail-page').isVisible(),true);assert.equal(await page.locator('#detail-page h1').count(),1);assert.doesNotMatch(await page.locator('#detail-page h1').textContent(),/没有目的地/)}
 for(const width of [1440,1024,768,390,360]){
  await page.setViewportSize({width,height:900});await page.goto('http://localhost:3000');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`horizontal overflow at ${width}`);
 }
 await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3000');
 await page.screenshot({path:'artifacts/mobile.png',fullPage:true});
 await page.locator('.menu-toggle').click();assert.equal(await page.locator('#main-nav').isVisible(),true);
 await page.locator('#main-nav [data-filter-link]').click();
 await page.waitForURL('**/?category=streaming#rankings');
 assert.equal(await page.locator('.vpn-card').count(),3);
 await page.locator('.hero').evaluate(el=>window.scrollTo(0,el.offsetTop+el.offsetHeight+150));
 await page.waitForTimeout(600);assert.equal(await page.locator('.mobile-recommendation').isVisible(),true);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,internalPages:internal.length,viewports:[1440,1024,768,390,360],checks:['filters','expand details','search','search injection safety','dialogs','newsletter','internal routes','horizontal overflow','mobile menu','mobile sticky bar','no JavaScript errors']}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

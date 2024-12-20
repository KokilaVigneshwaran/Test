import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Open the URL
  await page.goto('https://d3pv22lioo8876.cloudfront.net/tiptop/');

  // Verify that the text input element with xpath .//input[@name='my-disabled'] is disabled
  const disabledInput =  page.locator("//label//input[@name='my-disabled']");
  await expect(disabledInput).toBeDisabled();

  // Verify that the text input with value 'Readonly input' is in readonly state by using 2 xpaths
  const readonlyInput1 =  page.locator(".//input[@value='Readonly input']");
  const readonlyInput2 =  page.locator(".//input[@readonly and @value='Readonly input']");
  await expect(readonlyInput1).toHaveAttribute('readonly', 'true');
  await expect(readonlyInput2).toHaveAttribute('readonly', 'true');

  // Verify that the dropdown field to select color is having 8 elements using 2 xpaths
  const dropdown1 =  page.locator("//select[@class='form-select']");
  const dropdown2 =  page.locator("//select[@name='my-select']");
  await expect(dropdown1.locator('option')).toHaveCount(8);
  await expect(dropdown2.locator('option')).toHaveCount(8);

  // Verify that the submit button is disabled when no data is entered in Name field
  const submitButton =  page.locator("//button[@type='submit']");
  await expect(submitButton).toBeDisabled();

  // Verify that the submit button is enabled when both Name and Password field is entered
  const nameField =  page.locator("//input[@name='my-name']");
  const passwordField = page.locator("//input[@name='my-password']");
  await nameField.fill("Test Name");
  await passwordField.fill("TestPassword");
  await expect(submitButton).toBeEnabled();

  // Verify that on submit of 'Submit' button the page shows 'Received' text
  await submitButton.click();
  const receivedText =  page.locator("//*[contains(text(), 'Received')]");
  await expect(receivedText).toBeVisible();

  // Verify that on submit of form all the data passed to the URL
  const form = page.locator(".//form");
  const actionUrl = await form.getAttribute('action');
  console.log(actionUrl); // Verify the action URL if needed

  // Close the browser
  await browser.close();
})();
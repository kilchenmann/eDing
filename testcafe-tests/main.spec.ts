import {ClientFunction, Selector} from 'testcafe';

const removeLocalStorage = ClientFunction(() => {
    window.localStorage.removeItem('ingestPackages');
});

// declare test elements
const links = {
    upload: Selector('a').withText('Start'),
    organize: Selector('a').withText('Paketieren'),
    info: Selector('a').withText('Info / Hilfe')
}

const buttons = {
    next: Selector('button').withText('Weiter'),
    removeAllPackages: Selector('button').withText('Alle Pakete entfernen'),
    exportPackages: Selector('button').withText('Pakete exportieren/speichern'),
    generateAllPackages: Selector('button').withText('Automatische Generierung'),
    expandAll: Selector('button').withText('Alle aufklappen'),
    collapseAll: Selector('button').withText('Alle zuklappen')
}
const expansionPanels = Selector('mat-expansion-panel');

const firstPanelDescription = Selector("mat-expansion-panel-header")
    .nth(0)
    .find("mat-panel-description");

const matNodes = Selector('mat-nested-tree-node');

const matDialog = Selector("mat-dialog-container");

// path to application
fixture`Electron tests`
    .page('../dist/ech-0160-dimag-ingest/index.html').afterEach(async () => {
    await removeLocalStorage();
});

// run tests
test('Upload wrong file and check if dialog is visible', async page => {
    await page.setFilesToUpload('input[type=file]', ['../files-to-upload/test.txt']);
    await page.expect(matDialog.visible).ok();
});

test('Test navigating between upload and organize', async page => {
    // check if links are visible
    await page.expect(links.upload.visible).ok();
    await page.expect(links.organize.visible).ok();
    await page.expect(links.info.visible).ok();

    // check navigation to organize page and display error-dialog
    await page.click(links.organize);
    await page.expect(matDialog.visible).ok();
    await page.click(Selector('mat-dialog-actions').find('button'));

    // successfully upload file
    await uploadZip(page);

    // check navigation between upload and organize
    await page.click(links.upload);
    await page.click(links.organize);
    await page.expect(matDialog.exists).notOk();
    await page.expect(buttons.generateAllPackages.visible).ok();

    // check navigation to info page and check it
    await page.click(links.info);
    await page.expect(Selector('app-start-component').visible).ok();
    await page.expect(Selector('app-about-component').visible).ok();
})

test('Auto-generate packages and check them', async page => {
    await uploadZip(page);

    // generate all packages
    await page.click(buttons.generateAllPackages);
    await page.expect(buttons.removeAllPackages.visible).ok();
    await page.expect(buttons.exportPackages.visible).ok();

    // check ingest packages
    await page.expect(expansionPanels.count).eql(3);
    await page.expect(firstPanelDescription.innerText).eql("6 Dateien");

    // remove package after package and check again
    await page.click(getRemovePackageButton(page, 0));
    await page.expect(expansionPanels.count).eql(2);
    await page.expect(firstPanelDescription.innerText).eql("4 Dateien");
    await page.click(getRemovePackageButton(page, 0));
    await page.expect(expansionPanels.count).eql(1);
    await page.expect(firstPanelDescription.innerText).eql("7 Dateien");
    await page.click(getRemovePackageButton(page, 0));
    await page.expect(expansionPanels.count).eql(0);

    // generate all packages again
    await page.click(buttons.generateAllPackages);
    await page.expect(expansionPanels.count).eql(3);

    // remove all packages
    await page.click(buttons.removeAllPackages);
    await page.expect(expansionPanels.count).eql(0);
});

test('Generate custom packages', async page => {
    await uploadZip(page);

    // generate packages and check them
    await page.expect(matNodes.count).eql(3);
    await page.click(getAddPackageButton(page, 0));

    await page.expect(expansionPanels.count).eql(1);
    await page.expect(firstPanelDescription.innerText).eql("6 Dateien");

    await page.click(getAddPackageButton(page, 1));
    await page.expect(expansionPanels.count).eql(2);
    await page.expect(firstPanelDescription.innerText).eql("4 Dateien");

    await page.expect(buttons.removeAllPackages.visible).ok();
    await page.expect(buttons.exportPackages.visible).ok();

    // remove all packages
    await page.click(buttons.removeAllPackages);
    await page.expect(expansionPanels.exists).notOk();
    await page.expect(buttons.removeAllPackages.exists).notOk();
    await page.expect(buttons.exportPackages.exists).notOk();
});

test('Test expand / collapse button', async page => {
    await uploadZip(page);

    // check button behaviour
    await page.expect(buttons.expandAll.visible).ok();
    await page.click(buttons.expandAll);

    await page.expect(buttons.collapseAll.visible).ok();
    await expandOrCollapseMatNode(page, 0);
    await page.expect(buttons.expandAll.visible).ok();

    await expandOrCollapseMatNode(page, 0);
    await page.expect(buttons.collapseAll.visible).ok();

    // navigate and check if button state was restored correctly
    await page.click(links.organize);
    await page.click(links.organize);
    await page.expect(buttons.collapseAll.visible).ok();
})

// todo: not working because we can't invoke 'show-save-dialog' with this test
// test('Export packages', async page => {
//     await uploadZip(page);
//
//     await page.click(getAddPackageButton(page, 0));
//     await page.click(buttons.exportPackages);
// })

// todo: add a test which a more complex zip-file to test the 'flat' packages

// upload a zip file and click next
async function uploadZip(page: TestController) {
    // todo: add parameter to function to upload an easy or complex zip-file
    await page.setFilesToUpload('input[type=file]', ['../files-to-upload/test.zip']);
    await page.click(buttons.next);
    await page.expect(buttons.generateAllPackages.visible).ok();
    await page.expect(matDialog.exists).notOk()
    await page.expect(buttons.removeAllPackages.exists).notOk();
    await page.expect(buttons.exportPackages.exists).notOk();
}

// get specific 'add package'-button
function getAddPackageButton(page: TestController, element: number) {
    return Selector((matNodes.nth(element).find('Button').withText('Paket hinzufügen')));
}

// get specific 'remove package-button
function getRemovePackageButton(page: TestController, element: number) {
    return Selector('button').withText('Paket entfernen').nth(element);
}

// expand specific mat node
function expandOrCollapseMatNode(page: TestController, element: number) {
    return page.click(Selector(matNodes).nth(element).find('button'));
}

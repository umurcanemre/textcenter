import { readDDB, writeDDB, dropTables } from './connection/dynamo.js'
import { Page, insertPageParam, getPageParam } from './domain/page.js'
import { Text, getTextParam, insertTextParam } from './domain/text.js'

function objTest2() {
    let localeToMap = { us_EN: "test", tr_TR: "test", de_DE: "test" };

    let nt = new Text('test', localeToMap);

    writeDDB(insertTextParam(nt), () => { });

    readDDB(getTextParam(nt.label, nt.application, 1), (item) => {
        console.log(JSON.stringify(item))
        console.log(item.localeValue.us_EN)

    })
    nt.version = 2;
    nt.localeValueMap.us_EN = "tast"
    //nt.localeValueMap = JSON.stringify(localeToMap)



    writeDDB(insertTextParam(nt), () => {
        let labelVersion = { "test": 2 }
        let page = new Page('page', labelVersion)


        for (const [key, value] of Object.entries(labelVersion)) {
            readDDB(getTextParam(key, nt.application, value), (item) => {
                console.log(item)
                for (const [locale, text] of Object.entries(item.localeValue)) {
                    page.textLabelValueMap[locale] = { key: item.localeValue[locale] }
                }
                writeDDB(insertPageParam(page), () => {
                    readDDB(getPageParam(page.label, page.application, page.version), (item) => {
                        console.log(item)
                    })
                });
            })
        }


    })

}

objTest2();

//dropTables()